// Imports for the lambda function
const AWS = require("aws-sdk");
const dynamodbClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3({ signatureVersion: "v4" });
const lambda = new AWS.Lambda();

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Generates a common update query for updating multiple attributes in the database
 * @param {*} fields
 * @returns {Expression}
 */
const generateUpdateQuery = (fields) => {
  let exp = {
    UpdateExpression: "set",
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
  };
  Object.entries(fields).forEach(([key, item]) => {
    exp.UpdateExpression += ` #${key} = :${key},`;
    exp.ExpressionAttributeNames[`#${key}`] = key;
    exp.ExpressionAttributeValues[`:${key}`] = item;
  });
  exp.UpdateExpression = exp.UpdateExpression.slice(0, -1);
  return exp;
};

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Decides and updates bid winner
 * @param {*} fields
 * @returns {Expression}
 */
const updateBidWinner = async (table, bid, winner_id, product_name) => {
    try {
      let expression = "";
      if (bid.user_id === winner_id) {
        expression = generateUpdateQuery({ bid_status: "won" });
      } else {
        expression = generateUpdateQuery({ bid_status: "lost" });
      }
      const params = {
        TableName: table,
        Key: {
          bid_id: bid.bid_id,
        },
        ...expression,
        ReturnValues: "UPDATED_NEW",
      };
      const response = await dynamodbClient.update(params).promise();
      // TODO: Change this
      console.info(`Successfully updated the bid for user ${bid.user_id} .`, response);
      return {
        message: "Successfully updated the bid.",
        success: true,
        data: response,
      };
    } catch (err) {
      console.error("Unable to update an existing bid.", err);
      return {
        message: "Unable to update an existing bid.",
        success: false,
        error: err,
      };
    }
};

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Gets user email id based on user id
 * @param {String} user_id
 * @param {*} data
 * @returns {Bid}
 */
const getUserEmailById = async (user_id) => {
  
  try{
    let params = {
      TableName: 'users',
      Key: {
        user_id: user_id,
      },
    };
    const {Items: response} = await dynamodbClient.scan(params).promise();
    if(response && response.length > 0){
      return {
        message: "Successfully retrieved email of the user",
        success: true,
        data: response[0].email_id
      }
    }
  } catch (err){
    console.error("Unable to retrieve user specific email information.", err);
    return {
      message: "Unable to retrieve user specific email information.",
      success: false,
      error: err,
    };
  }
}

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Gets user email id based on user id
 * @param {String} user_id
 * @param {*} data
 * @returns {Bid}
 */
const getProductNameFromId = async (product_id) => {
  
  try{
    let params = {
      TableName: 'products',
      Key: {
        product_id: product_id,
      },
    };
    const {Items: response} = await dynamodbClient.scan(params).promise();
    if(response && response.length > 0){
      return {
        message: "Successfully retrieved email of the user",
        success: true,
        data: response[0].product_name
      }
    }
  } catch (err){
    console.error("Unable to retrieve product specific name information.", err);
    return {
      message: "Unable to retrieve product specific name information.",
      success: false,
      error: err,
    };
  }
}

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Gets user specific bid information from the database
 * @param {String} table
 * @param {*} data
 * @returns {Bid}
 */
const getProductSpecificBids = async (table, product_id) => {
  try {
    let params = {
      TableName: table,
      Key: {
        product_id: product_id,
      },
    };
    const {Items: response} = await dynamodbClient.scan(params).promise();
    console.info(
      "Successfully retrieved product specific bid information.",
      response
    );
    let winner_id = "";
    let max = 0;
    let products = [];
    for (let i = 0; i < response.length; i++) {
      console.log("LOPP DATA ", response[i].product_id, product_id, typeof(response[i].product_id), typeof(product_id));
      if(response[i].product_id === product_id){
        console.log("RESP", response[i]);
        const value = response[i].bid_amount;
        if (value > max) {
          max = value;
          winner_id = response[i].user_id;
          console.log("MAX & Winner", max, winner_id)
        }
        products.push(response[i]);
      }
    }
    console.log("Max Bid was by : " + winner_id);
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const updateBidWinnerResp = await updateBidWinner(
        table,
        product,
        winner_id,
        product.product_name
      );
    }
    const {data: product_name} = await getProductNameFromId(product_id);
    const {data: winner_email_id} = await getUserEmailById(winner_id);
    const sendEmailResp = await lambda.invoke({
          FunctionName: 'sendEmail', 
          Payload: `{"product_name": "${product_name}", "winner_email_id": "${winner_email_id}"}`
    }).promise();
      
    return {
      message: "Successfully retrieved user specific bid information.",
      success: true,
      data: response,
    };
  } catch (err) {
    console.error("Unable to retrieve user specific bid information.", err);
    return {
      message: "Unable to retrieve user specific bid information.",
      success: false,
      error: err,
    };
  }
};

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Bid decider lambda called by the CW Events
 * @param {String} table
 * @param {*} data
 * @returns {Bid}
 */
exports.handler = async (event) => {
  console.log("event.body", event.product_id);
  await getProductSpecificBids("bids", event.product_id);
  const response = {
    statusCode: 200,
    body: JSON.stringify("Successfully updated bids!", event),
  };
  return response;
};
