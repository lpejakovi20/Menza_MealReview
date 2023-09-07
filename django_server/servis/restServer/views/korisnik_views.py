from restServer.models import Korisnik
from django.http import JsonResponse, HttpResponseNotAllowed
from django.shortcuts import get_object_or_404
import hashlib
import json


def korisnici_view(request):
    if request.method == 'GET':
        return get_korisnici(request)
    elif request.method == 'POST':
        return post_korisnici(request)
    elif request.method == 'OPTIONS':
        # Handle CORS preflight request
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = '*'  # Set appropriate origin or use whitelist
        response['Access-Control-Allow-Methods'] = 'GET, POST'
        response['Access-Control-Allow-Headers'] = 'Content-Type'  # Add other required headers
        response['Access-Control-Allow-Headers'] += ', X-CSRFToken'
        return response
    else:
        # Return HTTP 405 Method Not Allowed for other methods
        return HttpResponseNotAllowed(['GET', 'POST'])

def korisnik_view(request, data):
    if request.method == 'GET':
        return get_korisnik(request, data)
    elif request.method == 'DELETE':
        return delete_korisnik(request, data)
    else:
        return HttpResponseNotAllowed(['GET', 'DELETE'])


def get_korisnici(request):
    korisnici = Korisnik.objects.filter(aktiviran=False)
    korisnici_list = list(korisnici.values())
    return JsonResponse(korisnici_list, safe=False)


def post_korisnici(request):

    uloga = get_object_or_404(Uloga, id=2)

    data = json.loads(request.body)
    ime = data.get('ime')
    prezime = data.get('prezime')
    korime = data.get('korime')
    lozinka = data.get('lozinka')
    email = data.get('email')

    lozinka = kreirajSHA256(lozinka + korime)
    
    korisnik = Korisnik(ime=ime, prezime=prezime, korime=korime, lozinka=lozinka, email=email, aktiviran=False, uloga=uloga)
    korisnik.save()
    
    return JsonResponse({'message': 'Korisnik created successfully'}, status=200)

def get_korisnik(request, korime):
    if request.method == 'OPTIONS':
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = '*'  # Set appropriate origin or use whitelist
        response['Access-Control-Allow-Methods'] = 'GET, POST'
        response['Access-Control-Allow-Headers'] = 'Content-Type'  # Add other required headers
        response['Access-Control-Allow-Headers'] += ', X-CSRFToken'
        return response

    else:
        korisnik = get_object_or_404(Korisnik, korime=korime)

        korisnik_data = {
            'id': korisnik.id,
            'ime': korisnik.ime,
            'prezime': korisnik.prezime,
            'korime': korisnik.korime,
            'lozinka': korisnik.lozinka,
            'email': korisnik.email,
            'aktiviran': korisnik.aktiviran,
            'uloga_id': korisnik.uloga.id,
        } 

        return JsonResponse(korisnik_data, safe=False, status=200)

def delete_korisnik(request, id):
    korisnik = get_object_or_404(Korisnik, id=id)
    korisnik.delete()
    return JsonResponse({'message': 'Korisnik deleted successfully'}, status=200)

def post_korisnik_prijava(request, korime):
    if request.method == 'POST':

        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        lozinka = body['lozinka']

        print(lozinka)

        lozinka_hash = kreirajSHA256(lozinka + korime)

        korisnik = get_object_or_404(Korisnik, korime=korime)

        korisnik_data = {
            'id': korisnik.id,
            'ime': korisnik.ime,
            'prezime': korisnik.prezime,
            'korime': korisnik.korime,
            'lozinka': korisnik.lozinka,
            'email': korisnik.email,
            'aktiviran': korisnik.aktiviran,
            'uloga_id': korisnik.uloga.id,
        } 

        if korisnik.lozinka == lozinka_hash:
            return JsonResponse(korisnik_data, safe=False)
        else:
            return JsonResponse({'error': 'Krivi podaci'}, status=401)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

def put_korisnik_aktivacija(request,id):
    if request.method == 'PUT':
        try:
            korisnik = Korisnik.objects.get(id=id)
        except Korisnik.DoesNotExist:
            return JsonResponse({'greska': 'Korisnik not found'}, status=404)

        korisnik.aktiviran = True
        korisnik.save()

        return JsonResponse('true', safe=False)
    else:
        return HttpResponseNotAllowed(['PUT'])

def kreirajSHA256(tekst):
    hash_object = hashlib.sha256()
    hash_object.update(tekst.encode('utf-8'))
    return hash_object.hexdigest()