import { Api, Auth, StackContext } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  // Create Api
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
    },
    routes: {
      "GET /private": "private.main",
      "GET /public": {
        function: "public.main",
        authorizer: "none",
      },
    },
  });

  // Create auth provider
  const auth = new Auth(stack, "Auth", {
    identityPoolFederation: {
      facebook: { appId: "419718329085014" },
    },
  });

  // Allow authenticated users invoke API
  auth.attachPermissionsForAuthUsers([api]);

  // Show the API endpoint and other info in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
    IdentityPoolId: auth.cognitoIdentityPoolId,
  });
}
