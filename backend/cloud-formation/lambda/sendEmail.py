import boto3
import os

def send_email(ARN, product_name, winner_email):
    
    sns = boto3.client('sns')
    sns.publish(
        TopicArn = ARN,
        Subject = "Bid Winner announced for product ",
        Message = "Congratulations!!! The bid winner for the product " + product_name + " is user " + winner_email + "."
    )

def lambda_handler(event, context):
    print("Event", event)
    arn = "arn:aws:sns:us-east-1:103757046369:AntiquelyNotifications"
    if os.environ["SnsArn"] != None:
        arn = os.environ["SnsArn"]
    send_email(arn, event["product_name"], event["winner_email_id"])
    return {
        "success": True
    }