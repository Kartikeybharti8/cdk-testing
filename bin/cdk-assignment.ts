#!/usr/bin/env node
import { ConfigurationParameters } from '../configuration_parameters'
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkAssignmentStack } from '../lib/cdk-assignment-stack';

const app = new cdk.App();

new CdkAssignmentStack(app, 'CdkAssignmentStack', {
  env: { 
    account: ConfigurationParameters.CDK_DEPLOY_ACCOUNT , 
    region: ConfigurationParameters.CDK_DEPLOY_REGION 
  }
});