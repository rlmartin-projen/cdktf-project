import { SsmParameter } from '@cdktf/provider-aws/lib/ssm-parameter';
import { TaggedConstruct, TaggedConstructConfig } from './taggedConstruct';
import { Fn, TerraformOutput } from 'cdktf';
import { Construct } from 'constructs';

type ParameterType = 'String' | 'StringList' | 'SecureString';

export interface OutputConfig extends TaggedConstructConfig {
  readonly description?: string;
  readonly namespace: string;
  readonly value: string | string[];
  readonly sensitive?: boolean;
}

/**
 * A construct that stores outputs in AWS ParameterStore, for use in other stacks.
 */
export class Output extends TaggedConstruct {
  constructor(scope: Construct, id: string, config: OutputConfig) {
    super(scope, id, config);
    const { description, namespace, sensitive = false, tags, value } = config;
    const paramType: ParameterType = sensitive ? 'SecureString' : Array.isArray(value) ? 'StringList' : 'String';

    new TerraformOutput(this, id, {
      value,
      description,
      sensitive,
      staticId: true,
    });

    new SsmParameter(this, 'parameter', {
      name: `/${namespace}/${id}`,
      value: Array.isArray(value) ? Fn.join(',', value) : value,
      description,
      type: paramType,
      tags,
    });
  }
}
