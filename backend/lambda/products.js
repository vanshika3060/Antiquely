const AWS = require('aws-sdk');
const dynamodbClient = new AWS.DynamoDB.DocumentClient();

// TODO: Fix this script to be modularized

const params = {
  TableName : 'products'
}

async function listItems(){
  try {
    const data = await dynamodbClient.scan(params).promise()
    return data
  } catch (err) {
    return err
  }
}

exports.handler = async (event, context, callback) => {

    AWS.config.update({
        region:  "us-east-1",
    });

    // Create Product
    let putRequest = {
        TableName: 'products',
        Item: {
            "product_id": AWS.util.uuid.v4(),
            "product_name": "Antique Jewellery 2",
            "product_minimum_bid_amount": 200,
            "product_image_url": "https://test.s3.us-east-2.amazonaws.com/occupancy.csv",
            "product_auction_start_date_time" : new Date().toString(),
            "product_auction_end_date_time" : new Date().toString(),
            "product_description": "This is an amazing product used by Queen Elizabeth."
        }
    };
    
    // Update Product
    let update = {
        TableName: 'products',
        Key: {
          "product_id": "fbf377b2-191b-4903-b4e8-df64320cdc90"  
        },
        UpdateExpression:"SET product_name=:t",
        ExpressionAttributeValues:{":t":`Worked!!!!`},
        ReturnValues:"UPDATED_NEW"
    };
    
    
    
    // // Update Product
    // await dynamodbClient.update(update).promise()
    // .then((data) => {
    //     console.info('successfully update to dynamodb', data)
    // })
    // .catch((err) => {
    //     console.info('failed adding data dynamodb', err)
    // });
    
    try {
    const data = await listItems()
    return { body: JSON.stringify(data) }
  } catch (err) {
    return { error: err }
  }

};