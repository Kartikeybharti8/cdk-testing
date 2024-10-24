import { EnvStackProps } from '../EnvConfig/FargateContainerDeploy'
import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';

import { Construct } from 'constructs';

export class CdkFragateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EnvStackProps ) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'FargateVpc', {
      maxAzs: 1
    });

    const cluster = new ecs.Cluster(this, 'EcsCluster', {
      vpc: vpc
    });

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'FargateTaskDefination', {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    const container = taskDefinition.addContainer('FargateContainer', {
      image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
    });

    container.addPortMappings({
      containerPort: 80
    });

    new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'FargateService', {
      cluster: cluster,
      taskDefinition: taskDefinition,
      publicLoadBalancer: true,
    });
  }
}

