import requests
from utils import welcome

def lambda_handler(event, context):
    print(f"Version of requests library: {requests.__version__}")
    request = requests.get('https://api.github.com/')
    layerItem = welcome()
    return {
        'statusCode': request.status_code,
        'body': request.text,
        'layerItem': layerItem
    }