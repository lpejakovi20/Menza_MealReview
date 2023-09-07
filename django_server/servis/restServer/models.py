from django.db import models

class Uloga(models.Model):
    id = models.AutoField(primary_key=True)
    naziv = models.CharField(max_length=50)

    class Meta:
        db_table = 'uloga'

    def __str__(self):
        return f"{self.naziv}"

class Korisnik(models.Model):
    id = models.AutoField(primary_key=True)
    ime = models.CharField(max_length=50)
    prezime = models.CharField(max_length=50)
    korime = models.CharField(max_length=50)
    lozinka = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    aktiviran = models.BooleanField(default=False)
    uloga = models.ForeignKey(Uloga(), on_delete=models.CASCADE)

    class Meta:
        db_table = 'korisnik'

    def __str__(self):
        return f"{self.ime} {self.prezime}"


class Proizvod(models.Model):
    id = models.AutoField(primary_key=True)
    naziv = models.CharField(max_length=100)
    opis = models.TextField()
    slika = models.CharField(max_length=255)

    class Meta:
        db_table = 'proizvod'

    def __str__(self):
        return f"{self.naziv}"

class Meni(models.Model):
    id = models.AutoField(primary_key=True)
    naziv = models.CharField(max_length=100)
    opis = models.TextField()
    slika = models.CharField(max_length=255)

    class Meta:
        db_table = 'meni'

    def __str__(self):
        return f"{self.opis}"

class RecenzijaProizvoda(models.Model):
    id = models.AutoField(primary_key=True)
    ocjena = models.IntegerField()
    sadrzaj = models.TextField()
    slika = models.CharField(max_length=255)
    video = models.CharField(max_length=255)
    datum_vrijeme = models.DateTimeField()
    odobreno = models.BooleanField(default=False)
    proizvod = models.ForeignKey(Proizvod(), on_delete=models.CASCADE)
    korisnik = models.ForeignKey(Korisnik(), on_delete=models.CASCADE)

    class Meta:
        db_table = 'recenzija_proizvoda'

    def __str__(self):
        return f"{self.ocjena}"

class RecenzijaMenija(models.Model):
    id = models.AutoField(primary_key=True)
    ocjena = models.IntegerField()
    sadrzaj = models.TextField()
    slika = models.CharField(max_length=255)
    video = models.CharField(max_length=255)
    datum_vrijeme = models.DateTimeField()
    odobreno = models.BooleanField(default=False)
    meni = models.ForeignKey(Meni(), on_delete=models.CASCADE)
    korisnik = models.ForeignKey(Korisnik(), on_delete=models.CASCADE)

    class Meta:
        db_table = 'recenzija_menija'

    def __str__(self):
        return f"{self.ocjena}"