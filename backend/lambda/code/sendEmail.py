import boto3

def send_email(ARN, product_name, winner_email):
    
    sns = boto3.client('sns')
    sns.publish(
        TopicArn = ARN,
        Subject = "Bid Winner announced for product ",
        Message = "Congratulations!!! The bid winner for the product " + product_name + " is user " + winner_email + "."
    )

def lambda_handler(event, context):
    print("Event", event)
    send_email("arn:aws:sns:us-east-1:103757046369:AntiquelyNotifications", event["product_name"], event["winner_email_id"])
    return {
        "success": True
    }