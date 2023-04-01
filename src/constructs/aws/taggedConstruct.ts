import { Construct } from 'constructs';

export interface TaggedConstructConfig {
  /**
   * Tags to add to every sub-resource
   */
  readonly tags?: { [key: string]: string };
}

export class TaggedConstruct extends Construct {
  tags: { [key: string]: string };
  constructor(scope: Construct, id: string, config: TaggedConstructConfig) {
    super(scope, id);
    this.tags = config.tags ?? {};
  }

  get tagString(): string {
    return JSON.stringify(this.tags);
  }
}
