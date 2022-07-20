// Imports for the lambda function
const AWS = require("aws-sdk");
const dynamodbClient = new AWS.DynamoDB.DocumentClient();

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Gets bid information from the database
 * @param {String} table 
 * @param {*} data 
 * @returns {Bid} 
 */
const getBids = async (table, data) => {
  try {
    let params = {
      TableName: table
    }
    let response = null;
    if(data?.bid_id){
      params = {
        ...params, 
          Key: {
            "bid_id": data.bid_id
          }
      }
      response = await dynamodbClient.get(params).promise();
    } else {
      response = await dynamodbClient.scan(params).promise();
    }

    console.info("Successfully retrieved bid information.", response);
    return {
      message: "Successfully retrieved bid information.",
      success: true,
      data: response
    };
  } catch (err) {
    console.error("Unable to retrieve bid information.", err);
    return {
      message: "Unable to retrieve bid information.",
      success: false,
      error: err
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
 const getUserSpecificBids = async (table, data) => {
    try {
      let params = {
        TableName: table,
        Key: {
            user_id: data?.user_id
        }
      }
      const response = await dynamodbClient.scan(params).promise();
      console.info("Successfully retrieved user specific bid information.", response);
      return {
        message: "Successfully retrieved user specific bid information.",
        success: true,
        data: response
      };
    } catch (err) {
      console.error("Unable to retrieve user specific bid information.", err);
      return {
        message: "Unable to retrieve user specific bid information.",
        success: false,
        error: err
      };
    }
  }

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Gets user & product specific bid information from the database
 * @param {String} table 
 * @param {*} data 
 * @returns {Bid} 
 */
 const getUserProductSpecificBids = async (table, user_id, product_id) => {
    try {
      let params = {
        TableName: table,
        FilterExpression: `user_id = :userId AND product_id = :productId`,
        ExpressionAttributeValues: {
          ":userId": user_id,
          ":productId": product_id
        }
      }
      const response = await dynamodbClient.scan(params).promise();
      console.info("Successfully retrieved user specific bid information.", response);
      return {
        message: "Successfully retrieved user specific bid information.",
        success: true,
        data: response
      };
    } catch (err) {
      console.error("Unable to retrieve user specific bid information.", err);
      return {
        message: "Unable to retrieve user specific bid information.",
        success: false,
        error: err
      };
    }
  }

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Creates bid information into the database
 * @param {String} table 
 * @param {*} data 
 * @returns {Bid} 
 */
const createBids = async (table, data) => {
  try {
    const bids = await getUserProductSpecificBids(table, data.user_id, data.product_id);
    if(bids.data.Items && bids.data.Items.length > 0){
      const response = await updateBids(table, bids.data.Items[0].bid_id, {bid_amount: data.bid_amount});    
      console.info("Successfully updated the user's bid.", response);
      return {
        message: "Successfully updated the user's bid.",
        success: true,
        data: response
      };
    }
    
    const params = {
      TableName: table,
      Item: {
        bid_id: AWS.util.uuid.v4(),
        user_id: data.user_id,
        bid_amount: data.bid_amount,
        bid_at: new Date().toString(),
        product_id: data.product_id,
        bid_status: "Awaiting Results"
      },
    };
    const response = await dynamodbClient.put(params).promise();
    console.info("Successfully created a new bid.", response);
    return {
      message: "Successfully created a new bid.",
      success: true,
      data: response
    };
  } catch (err) {
    console.error("Unable to create a new bid.", err);
    return {
      message: "Unable to create a new bid.",
      success: false,
      error: err
    }
  }
};

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Generates a common update query for updating multiple attributes in the database
 * @param {*} fields
 * @returns {Expression} 
 */
const generateUpdateQuery = (fields) => {
    let exp = {
        UpdateExpression: 'set',
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {}
    }
    Object.entries(fields).forEach(([key, item]) => {
        exp.UpdateExpression += ` #${key} = :${key},`;
        exp.ExpressionAttributeNames[`#${key}`] = key;
        exp.ExpressionAttributeValues[`:${key}`] = item
    })
    exp.UpdateExpression = exp.UpdateExpression.slice(0, -1);
    return exp
}

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Updates bid information into the database
 * @param {String} table 
 * @param {String} bid_id 
 * @param {*} data 
 * @returns {}
 */
const updateBids = async (table, bid_id, data) => {
  try {
    const expression = generateUpdateQuery(data);
    const params = {
      TableName: table,
      Key: {
        bid_id: bid_id,
      },
      ...expression,
      ReturnValues: "UPDATED_NEW"
    };
    const response = await dynamodbClient.update(params).promise();
    console.info("Successfully updated the bid.", response);
    return {
      message: "Successfully updated the bid.",
      success: true,
      data: response
    };
  } catch (err) {
    console.error("Unable to update an existing bid.", err);
    return {
      message: "Unable to update an existing bid.",
      success: false,
      error: err
    }
  }
};

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Updates bid information into the database
 * @param {String} table 
 * @param {String} bid_id 
 * @param {*} data 
 * @returns {}
 */
 const updateUserBid = async (table, user_id, data) => {
  try {
    const expression = generateUpdateQuery(data);
    const params = {
      TableName: table,
      Key: {
        user_id: user_id,
      },
      ...expression,
      ReturnValues: "UPDATED_NEW"
    };
    const response = await dynamodbClient.update(params).promise();
    console.info("Successfully updated the bid.", response);
    return {
      message: "Successfully updated the bid.",
      success: true,
      data: response
    };
  } catch (err) {
    console.error("Unable to update an existing bid.", err);
    return {
      message: "Unable to update an existing bid.",
      success: false,
      error: err
    }
  }
};


/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Deletes bid information from the database
 * @param {String} table 
 * @param {*} data 
 * @returns {Bid} 
 */
const deleteBids = async (table, data) => {
  try {
    let params = {
      TableName: table,
      Key: {
            "bid_id": data.bid_id
      }
    }
    const response = await dynamodbClient.delete(params).promise();
    console.info("Successfully deleted the bid information.", response);
    return {
      message: "Successfully deleted the bid information.",
      success: true,
      data: response
    };
  } catch (err) {
    console.error("Unable to delete the bid information.", err);
    return {
      message: "Unable to delete the bid information.",
      success: false,
      error: err
    };
  }
}

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Updates Configuration
 * @returns null
 */
const updateConfiguration = () => {
  AWS.config.update({
    region: "us-east-1",
  });
};

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Main event handler which handles the complete bid CRUD operation
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 * @returns 
 */
exports.handler = async (event, context, callback) => {
  
  // Updates the AWS Configuration
  updateConfiguration();

  // Fetches the data from the event body
  if (event.body !== null && event.body !== undefined) {
    
    // Fetches event body from the request body
    const info = JSON.parse(event.body);

    // Switch case based on the action to be performed
    switch(info.action){
      case "GET_ALL_BIDS":
        console.info("GET_ALL_BIDS called.")
        return getBids(info.table);
      case "GET_SPECIFIC_BID":
        console.info("GET_SPECIFIC_BID called.")
        return getBids(info.table, info.data);
      case "GET_USER_SPECIFIC_BID":
        console.info("GET_USER_SPECIFIC_BID called.")
        return getUserSpecificBids(info.table, info.data);
      case "CREATE_NEW_BID":
        console.info("CREATE_NEW_BID called.")
        return createBids(info.table, info.data);
      case "UPDATE_EXISTING_BID":
        console.info("UPDATE_EXISTING_BID called.")
        return updateBids(info.table, info.data?.bid_id, info.data?.update_data);
      case "UPDATE_USER_BID":
        console.info("UPDATE_USER_BID called.")
        return updateUserBid(info.table, info.data?.bid_id, info.data?.update_data);
      case "DELETE_A_BID":
        console.info("DELETE_A_BID called.")
        return deleteBids(info.table, info.data)
      default:
        console.error("Please provide a valid action to perform.");
        return {
          success: false,
          message: "Please provide a valid action to perform."
        }
    }
  }
};