#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

// Fargate stack deploy imports
// import { devFargateStackProps } from '../EnvConfig/FargateContainerDeploy/index'
// import { CdkFragateStack } from '../lib/cdk-fargate-stack';

// Glue Etl stack deploy imports
// import { devGlueEtlStackProps } from '../EnvConfig/GlueEtlDeploy'
// import { CdkGlueEtlStack } from '../lib/cdk-glue-etl-stack'

// Step function stack deploy imports
// import { devStepFunctionStackProps } from '../EnvConfig/StepFunctionDeploy/'
// import { CdkStepFunctionStack } from '../lib/cdk-step-function-stack'


// DMS job stack deploy imports
import { devDmsJobStackProps } from '../EnvConfig/DmsJobDeploy'
import { CdkDmsStack } from '../lib/cdk-dms-stack'

const app = new cdk.App();

// Stack for ECS fargate service
// new CdkFragateStack(app, 'DevCdkFargateStack', devFargateStackProps);

// Stack for Glue Etl service
// new CdkGlueEtlStack(app, 'DevCdkEtlGlueStack', devGlueEtlStackProps);

// Stack for Step-Function service
// new CdkStepFunctionStack(app, 'DevCdkStepFunctionStack', devStepFunctionStackProps);

// Stack for DMS service
new CdkDmsStack(app, 'DevDmsStack', devDmsJobStackProps);