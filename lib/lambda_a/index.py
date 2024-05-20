import os
import json
import boto3

s3 = boto3.client('s3')

def main(event, context):
    bucket_name = os.environ['TRIGGERING_BUCKET_NAME']
    file_key = 'kartikey.txt' 
    s3.put_object(Bucket=bucket_name, Key=file_key, Body='Hello, Kartikey!')

    return {
        'statusCode': 200,
        'body': json.dumps('File added to S3 bucket')
    }
