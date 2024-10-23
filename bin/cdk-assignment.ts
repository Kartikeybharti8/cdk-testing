#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

// Fargate stack deploy imports
// import { devFargateStackProps } from '../FargateContainerDeploy/index'
// import { CdkFragateStack } from '../lib/cdk-fargate-stack';

// Glue Etl stack deploy imports
import { devGlueEtlStackProps } from '../GlueEtlDeploy'
import { CdkGlueEtlStack } from '../lib/cdk-glue-etl-stack'

const app = new cdk.App();

// Stack for ECS fargate service
// new CdkFragateStack(app, 'DevCdkFargateStack', devFargateStackProps);

// Stack for Glue Etl service
new CdkGlueEtlStack(app, 'DevCdkEtlGlueStack', devGlueEtlStackProps);