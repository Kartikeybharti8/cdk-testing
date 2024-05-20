#!/usr/bin/env node
import { devStackProps, prodStackProps } from '../configuration_parameters'
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkAssignmentStack } from '../lib/cdk-assignment-stack';
import { CdkTestStack } from '../lib/cdk-test-stack';


const app = new cdk.App();

// new CdkAssignmentStack(app, 'CdkAssignmentStack', devStackProps);
new CdkTestStack(app, 'CdkTestStackDev', devStackProps);