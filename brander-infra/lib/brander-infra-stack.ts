import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// import lambda from aws cdk
import * as lambda from 'aws-cdk-lib/aws-lambda';
//import for gateway
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export class BranderInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // make layer.zip available for lambda
    const layer = new lambda.LayerVersion(this, 'BaseLayer', {
      code: lambda.Code.fromAsset('lambda_base_layer/layer.zip'),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_7],
    });

    // lambda function for our application
    const apiLambda = new lambda.Function(this, 'ApiFunction', {
      runtime: lambda.Runtime.PYTHON_3_7,
      // code to run in our lambda function
      code: lambda.Code.fromAsset('../pyApp/'),
      // module it runs once the function is invoked
      handler: 'brander_api.handler',
      //   add layers
      layers: [layer],
      //   add environments
      environment: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? '',
      },
    });

    // setup api gateway for our app
    const branderApi = new apiGateway.RestApi(this, 'RestApi', {
      restApiName: 'Brander API',
    });

    // lambda integration for the app API
    branderApi.root.addProxy({
      defaultIntegration: new apiGateway.LambdaIntegration(apiLambda),
    });
  }
}
