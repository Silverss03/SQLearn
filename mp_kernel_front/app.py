#!/usr/bin/env python3
import aws_cdk as cdk

from stacks.lib.build_configs.basic import BasicConfig
from stacks.lib.utils import get_config
from stacks.pipeline_stack import PipelineStack
from stacks.test_report_stack import TestReportStack

app: cdk.App = cdk.App()

env_name: str = app.node.try_get_context("env_name")

props = get_config(env_name, BasicConfig)

tags = props.tags(env_name)

if props.pipeline is not None:
    PipelineStack(
        app,
        f"{props.general.service_name.pascal_case}-Pipeline-{env_name}",
        env=cdk.Environment(
            account=props.account.account_id, region=props.account.region
        ),
        env_name=env_name,
        props=props,
        tags=tags,
    )

if props.test_report is not None:
    TestReportStack(
        app,
        f"{props.general.service_name.pascal_case}-TestReport-{env_name}",
        env=cdk.Environment(
            account=props.account.account_id, region=props.account.region
        ),
        env_name=env_name,
        props=props,
        tags=tags,
    )

app.synth()
