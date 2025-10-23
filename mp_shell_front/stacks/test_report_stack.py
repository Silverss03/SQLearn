import os
from dataclasses import asdict

import aws_cdk as cdk
import aws_cdk.aws_events as events
import aws_cdk.aws_events_targets as events_targets
import aws_cdk.aws_lambda as lambda_
import aws_cdk.aws_lambda_python_alpha as lambda_py
import aws_cdk.aws_logs as logs
import aws_cdk.aws_s3 as s3
import aws_cdk.aws_secretsmanager as secretsmanager
import aws_cdk.aws_ssm as ssm
import aws_cdk.aws_iam as iam
import aws_cdk.aws_codebuild as codebuild
from constructs import Construct

from stacks.lib.build_configs.basic import BasicConfig
from stacks.lib.build_configs.test_report import EventPatternConfig


class TestReportStack(cdk.Stack):
    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        env_name: str,
        props: BasicConfig,
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Initialization
        self._env_name = env_name
        self._props = props
        self._service_name = self._props.general.service_name

        backlog_sec = secretsmanager.Secret(
            self,
            "BacklogAPISecret",
            secret_name=f"{self._env_name}/{self._service_name.pascal_case}"
            + "/BacklogAPI",
        )

        dockerhub_secret = ssm.StringParameter.value_from_lookup(
            self,
            parameter_name="/Common/SecretsManager/DockerHub/Arn",
        )

        self._log_group = logs.LogGroup(
            self,
            "LogGroup",
            log_group_name=f"/codebuild/{self._service_name.snake_case}"
            + f"-test_report-{self._env_name}",
            removal_policy=cdk.RemovalPolicy.DESTROY,
            retention=logs.RetentionDays.TWO_WEEKS,
        )

        test_project: codebuild.Project = codebuild.Project(
            self,
            "TestProject",
            build_spec=codebuild.BuildSpec.from_source_filename(
                "src/test_report/buildspec.yml"
            ),
            source=codebuild.Source.s3(
                bucket=s3.Bucket.from_bucket_name(
                    self,
                    "SourceBucket",
                    bucket_name="apps-source-586911895505-ap-northeast-1",
                ),
                path="dummy.zip",
            ),
            environment=codebuild.BuildEnvironment(
                build_image=codebuild.LinuxBuildImage.STANDARD_7_0,
                privileged=True,
            ),
            environment_variables={
                "DOCKER_USERNAME": codebuild.BuildEnvironmentVariable(
                    value=dockerhub_secret + ":username",
                    type=codebuild.BuildEnvironmentVariableType.SECRETS_MANAGER,
                ),
                "DOCKER_PASSWORD": codebuild.BuildEnvironmentVariable(
                    value=dockerhub_secret + ":password",
                    type=codebuild.BuildEnvironmentVariableType.SECRETS_MANAGER,
                ),
            },
            logging=codebuild.LoggingOptions(
                cloud_watch=codebuild.CloudWatchLoggingOptions(
                    enabled=True,
                    log_group=self._log_group,
                )
            ),
            project_name=f"{self._service_name.snake_case}"
            + f"-test_report-{self._env_name}",
        )

        test_project.add_to_role_policy(
            iam.PolicyStatement(
                actions=["s3:GetObject*", "s3:GetBucket*", "s3:List*"],
                resources=["arn:aws:s3:::apps-source-586911895505-ap-northeast-1/*"],
            )
        )

        test_project.add_to_role_policy(
            iam.PolicyStatement(
                actions=[
                    "codeartifact:DescribePackageVersion",
                    "codeartifact:DescribeRepository",
                    "codeartifact:GetPackageVersionReadme",
                    "codeartifact:GetRepositoryEndpoint",
                    "codeartifact:ListPackageVersionAssets",
                    "codeartifact:ListPackageVersionDependencies",
                    "codeartifact:ListPackageVersions",
                    "codeartifact:ListPackages",
                    "codeartifact:ReadFromRepository",
                ],
                resources=[
                    "arn:aws:codeartifact:ap-northeast-1:456783087530"
                    + ":repository/mp-packages/mp-repo",
                ],
            )
        )

        test_project.add_to_role_policy(
            iam.PolicyStatement(
                actions=[
                    "codeartifact:CreateRepository",
                    "codeartifact:DescribeDomain",
                    "codeartifact:GetAuthorizationToken",
                    "codeartifact:GetDomainPermissionsPolicy",
                    "codeartifact:ListRepositoriesInDomain",
                ],
                resources=[
                    "arn:aws:codeartifact:ap-northeast-1:456783087530"
                    + ":domain/mp-packages",
                ],
            )
        )

        test_project.add_to_role_policy(
            iam.PolicyStatement(
                actions=[
                    "sts:GetServiceBearerToken",
                ],
                conditions={
                    "StringEquals": {
                        "sts:AWSServiceName": "codeartifact.amazonaws.com",
                    }
                },
                resources=[
                    "*",
                ],
            )
        )

        self._func: lambda_py.PythonFunction = lambda_py.PythonFunction(
            self,
            "StartFunction",
            entry=os.path.join("src/test_report", "lambdas"),
            environment={
                "PROJECT_NAME": test_project.project_name,
                "API_SECRET_NAME": backlog_sec.secret_name,
            },
            runtime=lambda_.Runtime.PYTHON_3_10,
            function_name=f"{self._service_name.snake_case}"
            + f"-test_report-{self._env_name}",
            log_retention=logs.RetentionDays.TWO_WEEKS,
            memory_size=128,
            timeout=cdk.Duration.seconds(5),
        )

        self._func.add_to_role_policy(
            iam.PolicyStatement(
                actions=["secretsmanager:GetSecretValue"],
                resources=["*"],
            )
        )

        self._func.role.add_managed_policy(
            iam.ManagedPolicy.from_aws_managed_policy_name(
                "AWSCodeBuildDeveloperAccess"
            )
        )

        self._func.role.add_managed_policy(
            iam.ManagedPolicy.from_aws_managed_policy_name("AmazonS3ReadOnlyAccess")
        )

        backlog_sec.grant_read(self._func.role)

        events.Rule(
            self,
            "StartRule",
            targets=[
                events_targets.LambdaFunction(
                    handler=self._func,
                    event=events.RuleTargetInput.from_object(
                        {
                            "status": "start_build",
                            "detail": events.EventField.from_path("$.detail"),
                        }
                    ),
                )
            ],
            event_pattern=events.EventPattern(
                **asdict(self._props.test_report.start.event_pattern)
            ),
            rule_name=f"{self._service_name.snake_case}-test_report-start"
            + f"-{self._env_name}",
        )

        notify_event_pattern: EventPatternConfig = asdict(
            self._props.test_report.notify.event_pattern
        )

        notify_event_pattern["detail"]["project-name"] = [test_project.project_name]

        events.Rule(
            self,
            "NotifyRule",
            targets=[
                events_targets.LambdaFunction(
                    handler=self._func,
                    event=events.RuleTargetInput.from_object(
                        {
                            "status": "notify",
                            "detail": events.EventField.from_path("$.detail"),
                        }
                    ),
                )
            ],
            event_pattern=events.EventPattern(**notify_event_pattern),
            rule_name=f"{self._service_name.snake_case}-test_report-notify"
            + f"-{self._env_name}",
        )
