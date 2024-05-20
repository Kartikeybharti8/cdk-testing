import { EnvStackProps } from '../configuration_parameters'
import * as cdk from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import path = require('path');


export class CdkTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EnvStackProps ) {
    super(scope, id, props);
    

    const triggeringLambdaCodeLayer = new lambda.LayerVersion(this, 'lambdaLayerConstruct', {
      layerVersionName: "lambda-layer-construct",
      code: lambda.Code.fromAsset(path.join(__dirname, 'layer_content.zip')),
      description: 'Lambda layer containing Triggering Lambda code.',
    });

    const triggeringLambda = new lambda.Function(this, 'lambdaConstruct', {
      functionName: "test-lambda-construct",
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'index.main',
      layers: [triggeringLambdaCodeLayer],
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda_c')),
    });
   
  }
}
