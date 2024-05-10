import json

def main(event, context):
    file_key = event['Records'][0]['s3']['object']['key']

    print(f'File added to bucket: {file_key}')

    return {
        'statusCode': 200,
        'body': json.dumps('File name printed')
    }
