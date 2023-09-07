from django.http import JsonResponse
import requests

def get_items(request):

    try:
        tekst = request.GET.get('tekst')
        app_id = "app_id"
        app_key = "app_key"
        
        url = f"https://api.edamam.com/api/recipes/v2?type=public&q={tekst}&app_id={app_id}&app_key={app_key}"
        
        response = requests.get(url)
        response.raise_for_status()

        data = response.json()
        return JsonResponse(data['hits'], safe=False)
    except requests.exceptions.RequestException as e:
        error_message = str(e)
        return JsonResponse({'error': error_message}, status=500)