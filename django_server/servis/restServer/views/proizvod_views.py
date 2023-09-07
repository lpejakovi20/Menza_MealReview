from restServer.models import Proizvod
from django.http import JsonResponse, HttpResponseNotAllowed
from django.shortcuts import get_object_or_404
import json

def proizvodi_view(request):
    if request.method == 'GET':
        return get_proizvodi(request)
    elif request.method == 'POST':
        return post_proizvodi(request)

def get_proizvodi(request):
    proizvodi = Proizvod.objects
    proizvodi_list = list(proizvodi.values())
    return JsonResponse(proizvodi_list, safe=False)

def post_proizvodi(request):

    data = json.loads(request.body)

    naziv = data.get('naziv')
    opis = data.get('opis')
    slika = data.get('slika')

    proizvod = Proizvod(naziv=naziv, opis=opis, slika=slika)
    proizvod.save()
    
    return JsonResponse({'message': 'Proizvod uspješno kreiran'}, status=200)

def get_proizvod(request, id):
    proizvod = get_object_or_404(Proizvod, id=id)

    proizvod_data = {
        'id': proizvod.id,
        'naziv': proizvod.naziv,
        'opis': proizvod.opis,
        'slika': proizvod.slika
    } 
    return JsonResponse(proizvod_data, safe=False, status=200)

def get_proizvod_prema_nazivu(request, naziv):
    proizvod = get_object_or_404(Proizvod, naziv=naziv)

    proizvod_data = {
        'id': proizvod.id,
        'naziv': proizvod.naziv,
        'opis': proizvod.opis,
        'slika': proizvod.slika
    } 
    return JsonResponse(proizvod_data, safe=False, status=200)