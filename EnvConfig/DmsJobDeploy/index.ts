import * as cdk from 'aws-cdk-lib';

export interface DmsJobsStackProps extends cdk.StackProps{
  
}

export const devDmsJobStackProps: DmsJobsStackProps = {
  env: { 
    account: "467600343464",
    region: "us-east-1", 
  },
}

