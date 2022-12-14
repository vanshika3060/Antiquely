// Imports for the lambda function
const AWS = require("aws-sdk");
const dynamodbClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3({ signatureVersion: "v4" });
const lambda = new AWS.Lambda();

// Constants definition
const PRODUCTS_BUCKET = "csci5409-products";
const IMAGES_DIRECTORY = "images";
const DECIDER_ARN = "arn:aws:lambda:us-east-1:103757046369:function:decider";

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
 * @description Gets product status from the database
 * @param {start} date 
 * @param {end} date 
 * @returns {Status} 
 */
const getProductStatus = (start, end) => {
  const current_date = new Date();
  const start_date = new Date(start);
  const end_date = new Date(end);
  
  if(current_date <= start_date){
    return "scheduled";
  } else if (current_date >= start_date && current_date <= end_date){
    return "on_sale";
  } else if (current_date >= end_date){
    return "completed";
  }
}

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Gets user specific products from the database
 * @param {String} table
 * @param {*} data 
 * @returns {Products}
 */
const getUserSpecificProducts = async (table, data) =>  {
  try {
    let params = {
      TableName: table,
      Key: {
          user_id: data?.user_id
      }
    }
    const response = await dynamodbClient.scan(params).promise();
    console.info("Successfully retrieved user specific product information.", response);
    return {
      message: "Successfully retrieved user specific product information.",
      success: true,
      data: response
    };
  } catch (err) {
    console.error("Unable to retrieve user specific product information.", err);
    return {
      message: "Unable to retrieve user specific product information.",
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
    const product_id = AWS.util.uuid.v4();
    const params = {
      TableName: table,
      Item: {
        product_id: product_id,
        product_name: data.product_name,
        product_minimum_bid_amount: data.product_minimum_bid_amount,
        product_image_url: data.product_image_url,
        product_auction_start_date_time: new Date(data.product_auction_start_date_time).toString(),
        product_auction_end_date_time: new Date(data.product_auction_end_date_time).toString(),
        product_description: data.product_description,
        product_status: getProductStatus(data.product_auction_start_date_time, data.product_auction_end_date_time)
      },
      ReturnValues: "ALL_OLD"
    };
    const response = await dynamodbClient.put(params).promise();
    const createEventResponse = await createCloudWatchEvent(product_id, new Date(data.product_auction_end_date_time).getTime(), "{\"product_id\":\""+product_id+"\"}");
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
 * @description Generates Pre Signed URL for data upload
 * @param {*} data 
 * @returns {String} url
 */
const generatePreSignedURL = async (data) => {
  try {
    const params = {
        Bucket: PRODUCTS_BUCKET,
        Key: IMAGES_DIRECTORY + "/" + data.product_image_file_name,
        ContentType: "multipart/form-data",
        Expires: 120
    };
    
    const response = await s3.getSignedUrl("putObject", params)
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
 * @description Converts date to cron expression
 * @param {*} param_date
 * @param {*} input 
 * @returns 
 */
const dateToCronExp = async (param_date) => {
    const date = new Date(param_date);
    const year = date.getFullYear();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const days = date.getDate();
    const months = date.getMonth() + 1;
    const dayOfWeek = date.getDay();
    const cronExpression = `cron(${minutes} ${hours} ${days} ${months} ? ${year})`;
    console.log("cron exp -> " + cronExpression);
    return cronExpression;
};

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Create an event
 * @param {*} cloudwatchevents
 * @param {*} params
 * @returns 
 */
async function createEvent(cloudwatchevents, params) {
    return new Promise((resolve, reject) => {
        cloudwatchevents.putRule(params, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Attach Permission to the cloud watch event
 * @param {*} eventName
 * @param {*} source
 * @returns 
 */
async function attachPermission(eventName, source) {
    const params = {
        Action: "lambda:InvokeFunction", 
        FunctionName: DECIDER_ARN,
        Principal: "events.amazonaws.com",
        SourceArn: source, 
        StatementId: eventName + AWS.util.uuid.v4()
    };
    return new Promise((resolve, reject) => {
        lambda.addPermission(params, function(err, data) {
           if (err) reject(err, err.stack); // an error occurred
           else     resolve(data);           // successful response
        });
    });
}

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Attach Target to the cloud watch event
 * @param {*} eventName
 * @param {*} cloudwatchevents
 * @param {*} input 
 * @returns 
 */
const attachTarget = (eventName, cloudwatchevents, input) => {
    const params = {
        Rule: eventName, /* Name of your event */
        Targets: [ 
            {
                Arn: DECIDER_ARN,
                Id: AWS.util.uuid.v4(), // Generate a Random String
                Input: input
            }
        ]
    }
    return new Promise((resolve, reject) => {
        cloudwatchevents.putTargets(params, function(err, data) {
          if (err) reject(err) // an error occurred
          else resolve(data)         // successful response
        });
    })
}

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Create cloud watch event
 * @param {*} eventName
 * @param {*} date
 * @param {*} input 
 * @returns 
 */
const createCloudWatchEvent = async (eventName, date, input) => {
    const cloudwatchevents = new AWS.CloudWatchEvents();
    const currentTime = new Date(date).getTime(); // UTC Time
    const scheduleExpression = await dateToCronExp(currentTime);
    const params = {
        Name: eventName,
        ScheduleExpression: scheduleExpression
    };
    const createdEvent = await createEvent(cloudwatchevents, params);
    const targetResponse = await attachTarget(eventName, cloudwatchevents, input);
    const lambdaPermission = await attachPermission(eventName, targetResponse.RuleArn);
    
}

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Main event handler which handles the complete product CRUD operation
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 * @returns 
 */
exports.handler = async (event, context, callback) => {
  
  // Log event data
  console.info("event", event);
  
  // Updates the AWS Configuration
  updateConfiguration();

  // Fetches the data from the event body
  if (event.body !== null && event.body !== undefined) {
    
    // Fetches event body from the request body
    const info = JSON.parse(event.body);

    // Switch case based on the action to be performed
    switch(info.action){
      case "GET_ALL_PRODUCTS":
        console.info("GET_ALL_PRODUCTS called.")
        return getProduct(info.table);
      case "GET_SPECIFIC_PRODUCT":
        console.info("GET_SPECIFIC_PRODUCT called.")
        return getProduct(info.table, info.data);
      case "GET_USER_SPECIFIC_PRODUCT":
        console.info("GET_USER_SPECIFIC_PRODUCT called.")
        return getUserSpecificProducts(info.table, info.data);
      case "CREATE_NEW_PRODUCT":
        console.info("CREATE_NEW_PRODUCT called.")
        return createProduct(info.table, info.data);
      case "UPDATE_EXISTING_PRODUCT":
        console.info("UPDATE_EXISTING_PRODUCT called.")
        return updateProduct(info.table, info.data?.product_id, info.data?.update_data);
      case "GEN_PRE_SIGNED_URL_PRODUCT_IMG_UPLOAD":
        console.info("UPDATE_EXISTING_PRODUCT called.")
        return generatePreSignedURL(info.data);
      case "DELETE_A_PRODUCT":
        console.info("DELETE_A_PRODUCT called.")
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