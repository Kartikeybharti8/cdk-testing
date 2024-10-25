import { DmsJobsStackProps } from '../EnvConfig/DmsJobDeploy'

import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as dms from 'aws-cdk-lib/aws-dms';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class CdkDmsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: DmsJobsStackProps) {
    super(scope, id, props);

    const sourceBucket = new s3.Bucket(this, 'SourceBucket', {
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const targetBucket = new s3.Bucket(this, 'TargetBucket', {
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const dmsRole = new iam.Role(this, 'DmsS3Role', {
      assumedBy: new iam.ServicePrincipal('dms.amazonaws.com'),
    });

    sourceBucket.grantRead(dmsRole);
    targetBucket.grantReadWrite(dmsRole);

    dmsRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['s3:ListBucket'],
        resources: [sourceBucket.bucketArn, targetBucket.bucketArn],
      })
    );

    const sourceEndpoint = new dms.CfnEndpoint(this, 'DmsSourceEndpoint', {
      endpointType: 'source',
      engineName: 's3',
      s3Settings: {
        bucketName: sourceBucket.bucketName,
        serviceAccessRoleArn: dmsRole.roleArn, 
      },
    });

    const targetEndpoint = new dms.CfnEndpoint(this, 'DmsTargetEndpoint', {
      endpointType: 'target',
      engineName: 's3',
      s3Settings: {
        bucketName: targetBucket.bucketName,
        serviceAccessRoleArn: dmsRole.roleArn,
      },
    });

    const replicationInstance = new dms.CfnReplicationInstance(this, 'DmsReplicationInstance', {
      replicationInstanceClass: 'dms.t3.micro',
      allocatedStorage: 1,
    });

    new dms.CfnReplicationTask(this, 'DmsReplicationTask', {
      replicationInstanceArn: replicationInstance.ref,
      sourceEndpointArn: sourceEndpoint.ref,
      targetEndpointArn: targetEndpoint.ref,
      migrationType: 'full-load',
      tableMappings: JSON.stringify({
        rules: [
          {
            ruleId: '1',
            ruleName: 'migrateAll',
            ruleAction: 'include',
            objectLocator: {
              schemaName: '%',
              tableName: '%',
            },
          },
        ],
      }),
    });
  }
}
