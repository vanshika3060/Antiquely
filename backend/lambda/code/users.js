// Imports for the lambda function
const AWS = require("aws-sdk");
const dynamodbClient = new AWS.DynamoDB.DocumentClient();

const getUser = async (users, data) => {
  try {
    let params = {
      TableName: users
    }
    let response = null;
    if(data?.user_id){
      params = {
        ...params, 
          Key: {
            "user_id": data.user_id
          }
      }
      response = await dynamodbClient.get(params).promise();
    } else {
      response = await dynamodbClient.scan(params).promise();
    }

    console.info("Successfully retrieved user information.", response);
    return {
      message: "Successfully retrieved user information.",
      success: true,
      data: response
    };
  } catch (err) {
    console.error("Unable to retrieve user information.", err);
    return {
      message: "Unable to retrieve user information.",
      success: false,
      error: err
    };
  }
}

const createUser = async (users, data) => {
  try {
    const params = {
      TableName: users,
      Item: {
        user_id: AWS.util.uuid.v4(),
        user_name: data.user_name,
        user_description: data.user.user_description
       
      },
    };
    const response = await dynamodbClient.put(params).promise();
    console.info("Successfully created a new user.", response);
    return {
      message: "Successfully created a new user.",
      success: true,
      data: response
    };
  } catch (err) {
    console.error("Unable to create a new user.", err);
    return {
      message: "Unable to create a new user.",
      success: false,
      error: err
    }
  }
};

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

const updateUser = async (users, user_id, data) => {
  try {
    const expression = generateUpdateQuery(data);
    const params = {
      TableName: users,
      Key: {
        user_id: user_id,
      },
      ...expression,
      ReturnValues: "UPDATED_NEW"
    };
    const response = await dynamodbClient.update(params).promise();
    console.info("Successfully updated the user.", response);
    return {
      message: "Successfully updated the user.",
      success: true,
      data: response
    };
  } catch (err) {
    console.error("Unable to update an existing user.", err);
    return {
      message: "Unable to update an existing user.",
      success: false,
      error: err
    }
  }
};


const deleteUser = async (users, data) => {
  try {
    let params = {
      TableName: users,
      Key: {
            "user_id": data.user_id
      }
    }
    const response = await dynamodbClient.delete(params).promise();
    console.info("Successfully deleted the user information.", response);
    return {
      message: "Successfully deleted the user information.",
      success: true,
      data: response
    };
  } catch (err) {
    console.error("Unable to user the product information.", err);
    return {
      message: "Unable to delete the user information.",
      success: false,
      error: err
    };
  }
}


const updateConfiguration = () => {
  AWS.config.update({
    region: "us-east-1",
  });
};


exports.handler = async (event, context, callback) => {
  
  // Updates the AWS Configuration
  updateConfiguration();

  // Fetches the data from the event body
  if (event.body !== null && event.body !== undefined) {
    
    // Fetches event body from the request body
    const info = JSON.parse(event.body);

    // Switch case based on the action to be performed
    switch(info.action){
      case "GET_ALL_USERS":
        console.info("GET_ALL_USERS called.")
        return getUser(info.table);
      case "GET_SPECIFIC_USER":
        console.info("GET_SPECIFIC_USER called.")
        return getUser(info.table, info.data);
      case "CREATE_NEW_USER":
        console.info("CREATE_NEW_PRODUCT called.")
        return createUser(info.table, info.data);
      case "UPDATE_EXISTING_USER":
        console.info("UPDATE_EXISTING_USER called.")
        return updateUser(info.table, info.data?.user_id, info.data?.update_data);
      case "DELETE_A_USER":
        console.info("DELETE_A_USER called.")
        return deleteUser(info.table, info.data)
      default:
        console.error("Please provide a valid action to perform.");
        return {
          success: false,
          message: "Please provide a valid action to perform."
        }
    }
  }
};
