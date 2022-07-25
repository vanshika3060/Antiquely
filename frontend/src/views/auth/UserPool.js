import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID || "us-east-1_yL6Nto5sP",
    ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || "2646hec90033j7qv2er2sh0cp9"
};

export default new CognitoUserPool(poolData);