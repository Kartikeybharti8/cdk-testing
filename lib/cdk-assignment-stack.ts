import { ConfigurationParameters } from '../configuration_parameters'
import * as cdk from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Notifications from 'aws-cdk-lib/aws-s3-notifications';
import path = require('path');

export class CdkAssignmentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const bucket = new s3.Bucket(this, 'lambda-trigger-bucket',{
      bucketName: ConfigurationParameters.TRIGGERING_BUCKET_NAME
    });
    

    const lambdaA = new lambda.Function(this, 'LambdaA', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda_a')), 
      environment: {
        "TRIGGERING_BUCKET_NAME": ConfigurationParameters.TRIGGERING_BUCKET_NAME
      }
    });

    bucket.grantReadWrite(lambdaA);

    const lambdaB = new lambda.Function(this, 'LambdaB', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda_b')), 
    });

    bucket.grantReadWrite(lambdaA);

    bucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3Notifications.LambdaDestination(lambdaB));
  }
}
