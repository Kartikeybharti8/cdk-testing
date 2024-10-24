import * as cdk from 'aws-cdk-lib';

export interface StepFunctionStackProps extends cdk.StackProps{
  
}

export const devStepFunctionStackProps: StepFunctionStackProps = {
  env: { 
    account: "467600343464",
    region: "us-east-1", 
  },
}

