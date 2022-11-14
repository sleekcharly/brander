import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// import lambda from aws cdk
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class BranderInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // lambda function for our application
    const apiLambda = new lambda.Function(this, 'ApiFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      // code to run in our lambda function
      code: lambda.Code.fromAsset('../../pyApp'),
      // module it runs once the function is invoked
      handler: 'brander_api.handler',
    });
  }
}
