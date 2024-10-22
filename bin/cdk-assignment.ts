#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

// Fargate stack deploy imports
import { devFargateStackProps } from '../FargateContainerDeploy/index'
import { CdkFragateStack } from '../lib/cdk-fargate-stack';

const app = new cdk.App();

new CdkFragateStack(app, 'DevCdkFargateStack', devFargateStackProps);