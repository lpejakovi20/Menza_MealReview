from restServer.models import RecenzijaProizvoda, Proizvod, Korisnik
from django.http import JsonResponse, HttpResponseNotAllowed
from django.shortcuts import get_object_or_404
from django.utils import timezone
import json

def recenzije_proizvoda_view(request):
    if request.method == 'GET':
        return get_recenzije_proizvoda(request)
    elif request.method == 'POST':
        return post_recenzije_proizvoda(request)

def get_recenzije_proizvoda(request):
    odobreno = request.GET.get('odobreno')
    recenzije_proizvoda = RecenzijaProizvoda.objects.filter(odobreno = odobreno)
    recenzije_proizvoda_list = list(recenzije_proizvoda.values())
    return JsonResponse(recenzije_proizvoda_list, safe=False)

def post_recenzije_proizvoda(request):
    data = json.loads(request.body)

    proizvod_id = data.get('proizvod_id')
    korisnik_id = data.get('korisnik_id')

    proizvod = get_object_or_404(Proizvod, id=proizvod_id)
    korisnik = get_object_or_404(Korisnik, id=korisnik_id)

    ocjena = data.get('ocjena')
    sadrzaj = data.get('sadrzaj')
    slika = data.get('slika')
    video = data.get('video')
    odobreno = False
    datetime = timezone.now()

    recenzija_proizvoda = RecenzijaProizvoda(ocjena=ocjena, sadrzaj=sadrzaj, slika=slika, video=video, odobreno=odobreno, datum_vrijeme = datetime, proizvod=proizvod, korisnik=korisnik)
    
    recenzija_proizvoda.save()
    
    return JsonResponse({'message': 'Recenzija proizvoda uspješno kreirana'}, status=200)

def recenzija_proizvoda_view(request, id):
    if request.method == 'GET':
        return get_recenzija_proizvoda(request, id)
    elif request.method == 'DELETE':
        return delete_recenzija_proizvoda(request, id)

def get_recenzija_proizvoda(request, id):
    recenzija_proizvoda = get_object_or_404(RecenzijaProizvoda, id=id)

    recenzija_proizvoda_data = {
        'id': recenzija_proizvoda.id,
        'ocjena': recenzija_proizvoda.ocjena,
        'sadrzaj': recenzija_proizvoda.sadrzaj,
        'slika': recenzija_proizvoda.slika,
        'video': recenzija_proizvoda.video,
        'datum_vrijeme' : recenzija_proizvoda.datum_vrijeme,
        'odobreno' : recenzija_proizvoda.odobreno,
        'proizvod_id': recenzija_proizvoda.proizvod.id,
        'korisnik_id': recenzija_proizvoda.korisnik.id
    } 

    return JsonResponse(recenzija_proizvoda_data, safe=False, status=200)

def delete_recenzija_proizvoda(request, id):
    recenzija_proizvoda = get_object_or_404(RecenzijaProizvoda, id=id)
    recenzija_proizvoda.delete()
    return JsonResponse({'message': 'Recenzija proizvoda uspješno uklonjena'}, status=200)

def get_recenzije_odabranog_proizvoda(request, id):
    recenzije_proizvoda = RecenzijaProizvoda.objects.filter(odobreno = True, proizvod__id = id)
    recenzije_proizvoda_list = list(recenzije_proizvoda.values())
    return JsonResponse(recenzije_proizvoda_list, safe=False)

def odobri_recenzija_proizvoda(request, id):
    try:
        recenzija_proizvoda = RecenzijaProizvoda.objects.get(id=id)
    except RecenzijaProizvoda.DoesNotExist:
        return JsonResponse({'greska': 'Recenzija proizvoda not found'}, status=404)

    recenzija_proizvoda.odobreno = True
    recenzija_proizvoda.save()

    return JsonResponse('true', safe=False)