import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_yL6Nto5sP",
    ClientId: "2646hec90033j7qv2er2sh0cp9"
};

export default new CognitoUserPool(poolData);