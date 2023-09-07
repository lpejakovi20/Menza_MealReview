from django.contrib import admin
from django.urls import path
from restServer.views import korisnik_views, datoteka_views, proizvod_views, meni_views, recenzija_proizvoda_views
from restServer.views import recenzija_menija_views, nutrition_api_views, html_parser_views

urlpatterns = [
    path('api/korisnici', korisnik_views.korisnici_view),
    path('api/korisnici/<str:data>', korisnik_views.korisnik_view),
    path('api/korisnici/<str:korime>/prijava', korisnik_views.post_korisnik_prijava),
    path('api/korisnici/<int:id>/aktivacija', korisnik_views.put_korisnik_aktivacija),

    path('api/htmlParse', html_parser_views.get_html),
    path('api/nutrition/items', nutrition_api_views.get_items),

    path('api/datoteka/<str:file_name>', datoteka_views.get_file),
    path('api/datoteka', datoteka_views.create_file),

    path('api/proizvodi', proizvod_views.proizvodi_view),
    path('api/proizvodi/<int:id>',proizvod_views.get_proizvod),
    path('api/dajProizvodPremaNazivu/<str:naziv>',proizvod_views.get_proizvod_prema_nazivu),

    path('api/meniji', meni_views.meniji_view),
    path('api/meniji/<int:id>',meni_views.get_meni),

    path('api/recenzijeProizvoda', recenzija_proizvoda_views.recenzije_proizvoda_view),
    path('api/recenzijeProizvoda/<int:id>', recenzija_proizvoda_views.recenzija_proizvoda_view),
    path('api/recenzijeOdabranogProizvoda/<int:id>', recenzija_proizvoda_views.get_recenzije_odabranog_proizvoda),
    path('api/recenzijeProizvoda/<int:id>/odobri', recenzija_proizvoda_views.odobri_recenzija_proizvoda),

    path('api/recenzijeMenija', recenzija_menija_views.recenzije_menija_view),
    path('api/recenzijeMenija/<int:id>', recenzija_menija_views.recenzija_menija_view),
    path('api/recenzijeOdabranogMenija/<int:id>', recenzija_menija_views.get_recenzije_odabranog_menija),
    path('api/recenzijeMenija/<int:id>/odobri', recenzija_menija_views.odobri_recenzija_menija),
]



