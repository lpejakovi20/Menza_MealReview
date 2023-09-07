import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatotekeService } from '../servisi/datoteke.service';
import { MenijiService } from '../servisi/meniji.service';
import { NutricionistickeVrijednostiService } from '../servisi/nutricionisticke-vrijednosti.service';
import { NutritionApiService } from '../servisi/nutrition-api.service';
import { ProizvodiService } from '../servisi/proizvodi.service';

@Component({
  selector: 'app-dodaj-novo',
  templateUrl: './dodaj-novo.component.html',
  styleUrls: ['./dodaj-novo.component.css']
})
export class DodajNovoComponent implements OnInit{

  items?: Array<any>

  nazivSlike?: any; 
  ekstenzijaSlike?: any; 
  
  constructor(private proizvodiServis: ProizvodiService, private menijiServis: MenijiService, private router: Router,
    private nutritionApiServis : NutritionApiService, private nutricionistickeVrijednostiServis : NutricionistickeVrijednostiService,
    private datotekeServis: DatotekeService){

  }
  ngOnInit(): void {
    let korisnik = sessionStorage.getItem("korisnik");
    let podaciKorisnika;
    if(korisnik){
      podaciKorisnika = JSON.parse(korisnik);
    }
    if(korisnik == null || podaciKorisnika.uloga_id != 1){
      this.router.navigate(["/pocetna"]);
    }
  }

  async PohraniMeni(e: any) {

    e.preventDefault();

    let naziv = <HTMLInputElement>document.getElementById("nazivMenija");
    let opis = <HTMLInputElement>document.getElementById("opisMenija");
    
    let izrazNaziv = /^[A-Za-z\s]{1,100}$/
    let izrazOpis = /^[A-Za-z\sšđžčć]{1,250}$/

    if(!izrazNaziv.test(naziv.value) || !izrazOpis.test(opis.value)){
        alert("Neispravan unos!");
        e.preventDefault();
    }
    else{

      const imageInput = <HTMLInputElement>document.getElementById('imageInput');

      if(imageInput.files && imageInput.files.length > 0){
        await this.uploadajSliku(imageInput,naziv.value);

        let slika = this.nazivSlike + "." + this.ekstenzijaSlike;
        let dodan = await this.menijiServis.dodajMeni(naziv.value,opis.value,slika);
        if(dodan){
          alert("Meni uspješno dodan!");
          naziv.value = "";
          opis.value = "";
        }
        else{
          alert("Neuspješno dodavanje menija!");
        } 
      }
      else{
        alert('Obavezno je dodati sliku!');
      }
    }
  }

  async uploadajSliku(imageInput : HTMLInputElement, naziv: string){

    if (imageInput.files && imageInput.files.length > 0) {
      if(await this.uploadDatoteke(imageInput, naziv)) alert("Slika uspješno dodana!");
      else alert("Neuspješno dodavanje slike!");
    }
  }

  async uploadDatoteke(fileInput: HTMLInputElement, naziv: string){
    let file;
    let ekstenzija;
    if(fileInput && fileInput.files) {
      file = fileInput.files[0];
      ekstenzija = file.name.split('.').pop();
    }
    else return false;
    
    this.nazivSlike = naziv;
    this.ekstenzijaSlike = ekstenzija;

    let uspjeh = false;
    if(file) {
      uspjeh = await this.datotekeServis.uploadImageFile(file,naziv);
    }
    return uspjeh;
  }

  async PohraniProizvod(naziv: any){
    
    let izrazNaziv = /^[A-Za-z\sšđžčć]{1,100}$/

    console.log("Naziv: " + naziv);

    if(!izrazNaziv.test(naziv)){
        alert("Neispravan unos!");
        return false;
    }
    else{
      let dodan = await this.proizvodiServis.dodajProizvod(naziv,"");
      return dodan;
    }
  }

  async dodajUbazu(item: any) {

    let identifikator = this.dohvatiIdentifikator(item.recipe.uri)
    let naziv = <HTMLInputElement>document.getElementById(identifikator);

    let uploadano = await this.datotekeServis.uploadImage(item.recipe.image,naziv.value + ".jpg");

    if(uploadano) {
      let dodan = await this.PohraniProizvod(naziv.value);
      if(dodan){
        alert("Proizvod uspješno dodan!");
        let dodaniProizvod = await this.proizvodiServis.dajProizvodPremaNazivu(naziv.value);
        await this.nutricionistickeVrijednostiServis.dodajNutricionistickeVrijednosti(item,dodaniProizvod.id);
      }
      else alert("Neuspješno dodavanje proizvoda!");
    }
    else alert("Neuspješno dodavanje proizvoda!");
    
    naziv.value = "";
  }

  async dohvatiJelaApi() {
    let tekst = <HTMLInputElement>document.getElementById("pretrazivanje");

    let izraz = /^[A-Za-z\sšđžčć]{1,100}$/

    if(!izraz.test(tekst.value)) alert("Neispravne kljucne rijeci za pretraživanje!")
    else this.items = await this.nutritionApiServis.getNutritionItems(tekst.value);
  }

  zaokruziKalorije(iznos: number){
    return Math.round(iznos);
  }

  dohvatiIdentifikator(naziv: string){
    let id = naziv.split("#")[1];
    return id;
  }
}
