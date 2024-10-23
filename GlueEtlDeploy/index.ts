import * as cdk from 'aws-cdk-lib';

export interface GlueEtlStackProps extends cdk.StackProps{
}

export const devGlueEtlStackProps: GlueEtlStackProps = {
  env: { 
    account: "467600343464",
    region: "us-east-1", 
  },
}

