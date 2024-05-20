import * as cdk from 'aws-cdk-lib';

export interface EnvStackProps extends cdk.StackProps{
  TRIGGERING_BUCKET_NAME: string,
  TRIGGERING_LAMBDA_NAME: string,
  TRIGGERED_LAMBDA_NAME: string,
  TRIGGERING_LAMBDA_CODE_LAYER_NAME:string
}

export const devStackProps: EnvStackProps = {
  env: { 
    account: "467600343464",
    region: "us-east-1", 
  },
  TRIGGERING_BUCKET_NAME: "bcbsa-dev-lambda-kb-triggered-bucket",
  TRIGGERING_LAMBDA_NAME: "bcbsa-dev-triggering-lambda-function-test",
  TRIGGERED_LAMBDA_NAME: "bcbsa-dev-triggered-lambda-function",
  TRIGGERING_LAMBDA_CODE_LAYER_NAME: "bcbsa-dev-triggering-lambda-code-layer"
}

export const prodStackProps: EnvStackProps = {
  env: { 
    account: "467600343464",
    region: "us-east-1", 
  },
  TRIGGERING_BUCKET_NAME: "bcbsa-prod-lambda-kb-123-trigger-bucket",
  TRIGGERING_LAMBDA_NAME: "bcbsa-prod-triggering-lambda-function",
  TRIGGERED_LAMBDA_NAME: "bcbsa-prod-triggered-lambda-function",
  TRIGGERING_LAMBDA_CODE_LAYER_NAME: "bcbsa-prod-triggering-lambda-code-layer"
}
