import * as cdk from 'aws-cdk-lib';

export interface EnvStackProps extends cdk.StackProps{
  
}

export const devFargateStackProps: EnvStackProps = {
  env: { 
    account: "467600343464",
    region: "us-east-1", 
  },
}

