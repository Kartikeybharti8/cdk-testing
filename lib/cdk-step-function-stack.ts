import { StepFunctionStackProps } from '../EnvConfig/StepFunctionDeploy'; // Corrected typo
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export class CdkStepFunctionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StepFunctionStackProps ) {
    super(scope, id, props);

    const firstLambdaFunction = new lambda.Function(this, 'FirstLambdaFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromInline(`
import json
def handler(event, context):
    print('Lambda 1st event:', event)
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Lambda 1 invoked successfully'})
    }
      `),
      handler: 'index.handler',
    });

    const secondLambdaFunction = new lambda.Function(this, 'SecondLambdaFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromInline(`
import json
def handler(event, context):
    print('Lambda 2nd event:', event)
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Lambda 2 invoked successfully'})
    }
      `),
      handler: 'index.handler',
    });

    const conditionalLambda = new lambda.Function(this, 'ConditionalLambda', {
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromInline(`
import json
def handler(event, context):
    print('Conditional Lambda event:', event)
    if event.get('number', 0) % 2 == 0:
        return { 'proceedTo': 'FirstLambdaFunction' }
    else:
        return { 'proceedTo': 'SecondLambdaFunction' }
      `),
      handler: 'index.handler',
    });

    const invokeFirstLambdaFunction = new tasks.LambdaInvoke(this, 'InvokeFirstLambdaFunction', {
      lambdaFunction: firstLambdaFunction,
      outputPath: '$.Payload',
    });

    const invokeSecondLambdaFunction = new tasks.LambdaInvoke(this, 'InvokeSecondLambdaFunction', {
      lambdaFunction: secondLambdaFunction,
      outputPath: '$.Payload',
    });

    const conditionalTask = new tasks.LambdaInvoke(this, 'InvokeConditionalLambda', {
      lambdaFunction: conditionalLambda,
      outputPath: '$.Payload',
    });

    const choiceState = new stepfunctions.Choice(this, 'InvokeLambdaChoice');

    choiceState.when(
      stepfunctions.Condition.stringEquals('$.proceedTo', 'FirstLambdaFunction'),
      invokeFirstLambdaFunction
    ).when(
      stepfunctions.Condition.stringEquals('$.proceedTo', 'SecondLambdaFunction'),
      invokeSecondLambdaFunction
    );

    const stepFunctionDefinition = conditionalTask.next(choiceState);

    new stepfunctions.StateMachine(this, 'ConditionalStepFunction', {
      definition: stepFunctionDefinition,
    });
  }
}
