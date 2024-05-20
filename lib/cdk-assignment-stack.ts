import { EnvStackProps } from '../configuration_parameters'
import * as cdk from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Notifications from 'aws-cdk-lib/aws-s3-notifications';
import path = require('path');


export class CdkAssignmentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EnvStackProps ) {
    super(scope, id, props);
    
    const bucket = new s3.Bucket(this, 'lambdaTriggernNewBucketNew',{
      bucketName: props.TRIGGERING_BUCKET_NAME
    });

    const triggeringLambdaCodeLayer = new lambda.LayerVersion(this, 'triggeringLambdaCodeLayer', {
      layerVersionName: props.TRIGGERING_LAMBDA_CODE_LAYER_NAME,
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda_a')),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_9],
      description: 'Lambda layer containing Triggering Lambda code.',
    });

    const triggeringLambda = new lambda.Function(this, 'triggeringLambda', {
      functionName: props.TRIGGERING_LAMBDA_NAME,
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'index.main',
      layers: [triggeringLambdaCodeLayer],
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda_a')),
      environment: {
        "TRIGGERING_BUCKET_NAME": props.TRIGGERING_BUCKET_NAME
      },
    });

    bucket.grantReadWrite(triggeringLambda);

    const triggeredLambda = new lambda.Function(this, 'triggeredLambdaNew', {
      functionName: props.TRIGGERED_LAMBDA_NAME,
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda_b')), 
    });

    bucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3Notifications.LambdaDestination(triggeredLambda));
  }
}
