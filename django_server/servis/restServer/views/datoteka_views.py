from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseServerError, JsonResponse
import boto3
from botocore.exceptions import ClientError
import json
import requests

def get_file(request, file_name):

    if not file_name:
        return HttpResponseBadRequest('Invalid request, missing file name')

    bucket_name = 'your bucket name'
    access_key = 'your access key'
    secret_key = 'your secret key'

    s3_client = boto3.client('s3', aws_access_key_id=access_key, aws_secret_access_key=secret_key)

    try:
        response = s3_client.get_object(Bucket=bucket_name, Key=file_name)

        content_type = response['ContentType']
        content_disposition = f'inline; filename="{file_name}"'
        response_headers = {
            'Content-Type': content_type,
            'Content-Disposition': content_disposition,
        }

        return HttpResponse(response['Body'].read(), headers=response_headers)
    except ClientError as e:
        print('Error retrieving file from S3:', str(e))
        return HttpResponseServerError('Error retrieving file')

def create_file(request):

    bucket_name = 'your bucket name'
    access_key = 'your access key'
    secret_key = 'your secret key'

    s3_client = boto3.client('s3', aws_access_key_id=access_key, aws_secret_access_key=secret_key)

    try:
        file = None
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if 'url' in body:
            file_url = body['url']
            response = requests.get(file_url)
            file = response.content
        elif 'file' in body:
            uploaded_file = body['file']
            file = uploaded_file.read()

        if file is None:
            return HttpResponseBadRequest('Invalid request, missing file data')

        file_name = body['naziv']

        if not file_name:
            return HttpResponseBadRequest('Invalid request, missing file name')

        s3_client.put_object(Body=file, Bucket=bucket_name, Key=file_name)

        return JsonResponse({'success': True})

    except ClientError as e:
        print('Error storing file to S3:', str(e))
        return JsonResponse({'success': False})