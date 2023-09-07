from django.http import HttpResponse
import requests

def get_html(request):
    try:
        response = requests.get("https://www.scvz.unizg.hr/jelovnik-varazdin/")
        response.raise_for_status()

        response_content_type = 'text/html'
        return HttpResponse(response.text, content_type=response_content_type)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'greska': str(e)})