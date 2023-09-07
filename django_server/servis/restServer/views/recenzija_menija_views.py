from restServer.models import RecenzijaMenija, Meni, Korisnik
from django.http import JsonResponse, HttpResponseNotAllowed
from django.shortcuts import get_object_or_404
from django.utils import timezone
import json

def recenzije_menija_view(request):
    if request.method == 'GET':
        return get_recenzije_menija(request)
    elif request.method == 'POST':
        return post_recenzije_menija(request)

def get_recenzije_menija(request):
    odobreno = request.GET.get('odobreno')
    recenzije_menija = RecenzijaMenija.objects.filter(odobreno = odobreno)
    recenzije_menija_list = list(recenzije_menija.values())
    return JsonResponse(recenzije_menija_list, safe=False)

def post_recenzije_menija(request):
    data = json.loads(request.body)

    korisnik_id = data.get('korisnik_id')
    meni_id = data.get('meni_id')

    meni = get_object_or_404(Meni, id=meni_id)
    korisnik = get_object_or_404(Korisnik, id=korisnik_id)

    ocjena = data.get('ocjena')
    sadrzaj = data.get('sadrzaj')
    slika = data.get('slika')
    video = data.get('video')
    odobreno = False
    datetime = timezone.now()

    recenzija_menija = RecenzijaMenija(ocjena=ocjena, sadrzaj=sadrzaj, slika=slika, video=video, odobreno=odobreno, datum_vrijeme = datetime, meni=meni, korisnik=korisnik)
    
    recenzija_menija.save()
    
    return JsonResponse({'message': 'Recenzija menija uspješno kreirana'}, status=200)

def recenzija_menija_view(request, id):
    if request.method == 'GET':
        return get_recenzija_menija(request, id)
    elif request.method == 'DELETE':
        return delete_recenzija_menija(request, id)

def get_recenzija_menija(request, id):
    recenzija_menija = get_object_or_404(RecenzijaMenija, id=id)

    recenzija_menija_data = {
        'id': recenzija_menija.id,
        'ocjena': recenzija_menija.ocjena,
        'sadrzaj': recenzija_menija.sadrzaj,
        'slika': recenzija_menija.slika,
        'video': recenzija_menija.video,
        'datum_vrijeme' : recenzija_menija.datum_vrijeme,
        'odobreno' : recenzija_menija.odobreno,
        'meni_id': recenzija_menija.meni.id,
        'korisnik_id': recenzija_menija.korisnik.id
    } 

    return JsonResponse(recenzija_menija_data, safe=False, status=200)

def delete_recenzija_menija(request, id):
    recenzija_menija = get_object_or_404(RecenzijaMenija, id=id)
    recenzija_menija.delete()
    return JsonResponse({'message': 'Recenzija menija uspješno uklonjena'}, status=200)

def get_recenzije_odabranog_menija(request, id):
    recenzije_menija = RecenzijaMenija.objects.filter(odobreno = True, meni__id = id)
    recenzije_menija_list = list(recenzije_menija.values())
    return JsonResponse(recenzije_menija_list, safe=False)

def odobri_recenzija_menija(request, id):
    try:
        recenzija_menija = RecenzijaMenija.objects.get(id=id)
    except RecenzijaMenija.DoesNotExist:
        return JsonResponse({'greska': 'Recenzija menija not found'}, status=404)

    recenzija_menija.odobreno = True
    recenzija_menija.save()

    return JsonResponse('true', safe=False)