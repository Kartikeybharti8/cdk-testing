import { GlueEtlStackProps } from '../GlueEtlDeploy'
import * as cdk from 'aws-cdk-lib';
import * as glue from 'aws-cdk-lib/aws-glue';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';

import { Construct } from 'constructs';

export class CdkGlueEtlStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GlueEtlStackProps ) {
    super(scope, id, props);

    const glueDataBucket = new s3.Bucket(this, 'GlueDataBucket', {
      bucketName: 's3-to-s3-glue-etl-test-bucket-128',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const glueRole = new iam.Role(this, 'GlueJobRole', {
      assumedBy: new iam.ServicePrincipal('glue.amazonaws.com'),
    });

    glueRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSGlueServiceRole')
    );

    glueDataBucket.grantReadWrite(glueRole);

    const glueEtlJob = new glue.CfnJob(this, 'GlueEtlJob', {
      name: 's3-to-s3-data-submission-glue-etl',
      command: {
        name: 'glueetl',
        scriptLocation: `s3://${glueDataBucket.bucketName}/scripts/glue_etl_script.py`
      },
      role: glueRole.roleArn,
      maxCapacity: 2,
    });
  }
}

