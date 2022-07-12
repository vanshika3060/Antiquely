// Imports for the lambda function
const AWS = require("aws-sdk");
const dynamodbClient = new AWS.DynamoDB.DocumentClient();

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Gets product information from the database
 * @param {String} table 
 * @param {*} data 
 * @returns {Product} 
 */
const getProduct = async (table, data) => {
  try {
    let params = {
      TableName: table
    }
    let response = null;
    if(data?.product_id){
      params = {
        ...params, 
          Key: {
            "product_id": data.product_id
          }
      }
      response = await dynamodbClient.get(params).promise();
    } else {
      response = await dynamodbClient.scan(params).promise();
    }

    console.info("Successfully retrieved product information.", response);
    return {
      message: "Successfully retrieved product information.",
      success: true,
      data: response
    };
  } catch (err) {
    console.error("Unable to retrieve product information.", err);
    return {
      message: "Unable to retrieve product information.",
      success: false,
      error: err
    };
  }
}

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Creates product information into the database
 * @param {String} table 
 * @param {*} data 
 * @returns {Product} 
 */
const createProduct = async (table, data) => {
  try {
    const params = {
      TableName: table,
      Item: {
        product_id: AWS.util.uuid.v4(),
        product_name: data.product_name,
        product_minimum_bid_amount: data.product_minimum_bid_amount,
        product_image_url: data.product_image_url,
        product_auction_start_date_time: new Date(data.product_auction_start_date_time).toString(),
        product_auction_end_date_time: new Date(data.product_auction_end_date_time).toString(),
        product_description: data.product_description,
      },
    };
    const response = await dynamodbClient.put(params).promise();
    console.info("Successfully created a new product.", response);
    return {
      message: "Successfully created a new product.",
      success: true,
      data: response
    };
  } catch (err) {
    console.error("Unable to create a new product.", err);
    return {
      message: "Unable to create a new product.",
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
 * @description Updates product information into the database
 * @param {String} table 
 * @param {String} product_id 
 * @param {*} data 
 * @returns {}
 */
const updateProduct = async (table, product_id, data) => {
  try {
    const expression = generateUpdateQuery(data);
    const params = {
      TableName: table,
      Key: {
        product_id: product_id,
      },
      ...expression,
      ReturnValues: "UPDATED_NEW"
    };
    const response = await dynamodbClient.update(params).promise();
    console.info("Successfully updated the product.", response);
    return {
      message: "Successfully updated the product.",
      success: true,
      data: response
    };
  } catch (err) {
    console.error("Unable to update an existing product.", err);
    return {
      message: "Unable to update an existing product.",
      success: false,
      error: err
    }
  }
};

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Deletes product information from the database
 * @param {String} table 
 * @param {*} data 
 * @returns {Product} 
 */
const deleteProduct = async (table, data) => {
  try {
    let params = {
      TableName: table,
      Key: {
            "product_id": data.product_id
      }
    }
    const response = await dynamodbClient.delete(params).promise();
    console.info("Successfully deleted the product information.", response);
    return {
      message: "Successfully deleted the product information.",
      success: true,
      data: response
    };
  } catch (err) {
    console.error("Unable to delete the product information.", err);
    return {
      message: "Unable to delete the product information.",
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
 * @description Main event handler which handles the complete product CRUD operation
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
    const info = event.body;

    // Switch case based on the action to be performed
    switch(info.action){
      case "GET_ALL_PRODUCTS":
        console.info("GET_ALL_PRODUCTS called.")
        return getProduct(info.table);
      case "GET_SPECIFIC_PRODUCT":
        return getProduct(info.table, info.data);
      case "CREATE_NEW_PRODUCT":
        return createProduct(info.table, info.data);
      case "UPDATE_EXISTING_PRODUCT":
        return updateProduct(info.table, info.data?.product_id, info.data?.update_data);
      case "DELETE_A_PRODUCT":
        return deleteProduct(info.table, info.data)
      default:
        console.error("Please provide a valid action to perform.");
        return {
          success: false,
          message: "Please provide a valid action to perform."
        }
    }
  }
};
