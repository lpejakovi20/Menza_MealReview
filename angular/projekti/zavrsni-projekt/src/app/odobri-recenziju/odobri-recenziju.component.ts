import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatotekeService } from '../servisi/datoteke.service';
import { RecenzijeProizvodiService } from '../servisi/recenzije-proizvodi.service';
import { RezencijeMenijiService } from '../servisi/rezencije-meniji.service';

@Component({
  selector: 'app-odobri-recenziju',
  templateUrl: './odobri-recenziju.component.html',
  styleUrls: ['./odobri-recenziju.component.css']
})
export class OdobriRecenzijuComponent implements OnInit{

  recenzijeMeniji?: Array<any>
  recenzijeProizvodi?: Array<any>

  constructor(private router: Router,private recenzijeMenijaServis: RezencijeMenijiService,
    private recenzijeProizvodaServis : RecenzijeProizvodiService, private datotekeServis: DatotekeService){

  }

  async ngOnInit() {
    let korisnik = sessionStorage.getItem("korisnik");
    let podaciKorisnika;
    if(korisnik){
      podaciKorisnika = JSON.parse(korisnik);
    }
    if(korisnik == null || podaciKorisnika.uloga_id != 1){
      this.router.navigate(["/pocetna"]);
    }
    else{
      this.dohvatiNeodobreneRecenzijeMenija();
      this.dohvatiNeodobreneRecenzijeProizvoda();
    }
  }

  parseDate(dateString: string) {
    return new Date(Date.parse(dateString));
  }

  async dohvatiNeodobreneRecenzijeMenija(){
    let odgovor = await this.recenzijeMenijaServis.dajRecenzije(0);
    this.recenzijeMeniji = odgovor;
    this.postaviResurseRecenzijaMenija();
  }

  async dohvatiNeodobreneRecenzijeProizvoda(){
    let odgovor = await this.recenzijeProizvodaServis.dajRecenzije(0);
    this.recenzijeProizvodi = odgovor;
    this.postaviResurseRecenzijaProizvoda();
  }

  async postaviResurseRecenzijaProizvoda(){
    if(this.recenzijeProizvodi)
    for (const r of this.recenzijeProizvodi) {
      if (r.slika) {
        r.slikaSrc = await this.prikaziSlikuRecenzije(r.slika);
      }
      if (r.video) {
        r.videoSrc = await this.prikaziVideoRecenzije(r.video);
      }
    }
  }

  async postaviResurseRecenzijaMenija(){
    if(this.recenzijeMeniji)
    for (const r of this.recenzijeMeniji) {
      if (r.slika) {
        r.slikaSrc = await this.prikaziSlikuRecenzije(r.slika);
      }
      if (r.video) {
        r.videoSrc = await this.prikaziVideoRecenzije(r.video);
      }
    }
  }

  async prikaziSlikuRecenzije(naziv: string){
    let url = await this.datotekeServis.getImage(naziv);
    return url;
  }

  async prikaziVideoRecenzije(naziv: string){
    let url = await this.datotekeServis.getVideo(naziv);
    return url;
  }

  async ukloni(id: number, vrsta: string){
    let odgovor;

    if(vrsta=="meni") odgovor = await this.recenzijeMenijaServis.ukloniRecenziju(id);
    else odgovor = await this.recenzijeProizvodaServis.ukloniRecenziju(id);

    if (!odgovor) alert("Dogodila se greška prilikom brisanja!");
    else{
      if(vrsta=="meni") this.dohvatiNeodobreneRecenzijeMenija();
      else this.dohvatiNeodobreneRecenzijeProizvoda();

      alert("Recenzija s id=" + id + " je uspješno uklonjena!");
    }
  }

  async odobri(id: number, vrsta: string){
    let odgovor;

    if(vrsta=="meni") odgovor = await this.recenzijeMenijaServis.odobriRecenziju(id);
    else odgovor = await this.recenzijeProizvodaServis.odobriRecenziju(id);

    if (odgovor.status != 200) alert("Greška u odobrenju recenzije s id=" + id + "!");
    else{
      if(vrsta=="meni") this.dohvatiNeodobreneRecenzijeMenija();
      else this.dohvatiNeodobreneRecenzijeProizvoda();

      alert("Recenzija s id=" + id + " je uspješno odobrena!");
    }
  }
}
