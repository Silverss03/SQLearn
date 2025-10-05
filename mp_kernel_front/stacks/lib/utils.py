import aws_cdk as cdk
import dacite
import yaml
from constructs import Construct

from stacks.lib.build_configs.basic import BasicConfig


def get_config(env_name, data_class) -> BasicConfig:
    with open(f"configs/environments/{env_name}.yaml", "r", encoding="utf-8") as yml:
        config = yaml.safe_load(yml)

    props = dacite.from_dict(data_class=data_class, data=config)

    return props


def ssm_string_parameter_lookup_with_dummy_value(
    scope: Construct, parameter_name: str, dummy_value: str
) -> str:
    return cdk.ContextProvider.get_value(
        scope,
        dummy_value=dummy_value,
        provider="ssm",
        props={"parameterName": parameter_name},
    ).value


def get_full_service_domain(service_domain, zone_name) -> str:
    if service_domain == "":
        full_service_domain = zone_name

    else:
        full_service_domain = service_domain + f".{zone_name}"

    return full_service_domain
