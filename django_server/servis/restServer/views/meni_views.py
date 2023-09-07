from restServer.models import Meni
from django.http import JsonResponse, HttpResponseNotAllowed
from django.shortcuts import get_object_or_404
import json

def meniji_view(request):
    if request.method == 'GET':
        return get_meniji(request)
    elif request.method == 'POST':
        return post_meniji(request)

def get_meniji(request):
    meniji = Meni.objects
    meniji_list = list(meniji.values())
    return JsonResponse(meniji_list, safe=False)

def post_meniji(request):
    data = json.loads(request.body)

    naziv = data.get('naziv')
    opis = data.get('opis')
    slika = data.get('slika')

    meni = Meni(naziv=naziv, opis=opis, slika=slika)
    meni.save()
    
    return JsonResponse({'message': 'Meni uspješno kreiran'}, status=200)

def get_meni(request, id):
    meni = get_object_or_404(Meni, id=id)

    meni_data = {
        'id': meni.id,
        'naziv': meni.naziv,
        'opis': meni.opis,
        'slika': meni.slika
    } 
    return JsonResponse(meni_data, safe=False, status=200)
