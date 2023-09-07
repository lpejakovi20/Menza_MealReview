import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from '../servisi/korisnici.service';

@Component({
  selector: 'app-aktivacija',
  templateUrl: './aktivacija.component.html',
  styleUrls: ['./aktivacija.component.css']
})
export class AktivacijaComponent implements OnInit{

  korisnici?: Array<any>

  constructor(private korisniciServis: KorisniciService, private router: Router){

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
      this.dohvatiNeaktiviraneKorisnike();
    }
  }

  async dohvatiNeaktiviraneKorisnike(){
    let odgovor = await this.korisniciServis.dajNeaktiviraneKorisnike();
    this.korisnici = odgovor;
  }

  async obrisiKorisnika(id: number) {
    let odgovor = await this.korisniciServis.ukloniKorisnika(id);
     if(odgovor) {
       alert("Korisnik s id=" + id + " je uspješno obrisan!");
       this.dohvatiNeaktiviraneKorisnike();
     }
     else{
       alert("Dogodila se greška prilikom brisanja!");
     }
  }
 
   async aktivirajKorisnika(id: number) {
     let o = await this.korisniciServis.aktivirajKorisnika(id);
     if (o.status == 200) {
       alert("Korisnik s id=" + id + " je uspješno aktiviran!");
       this.dohvatiNeaktiviraneKorisnike();
     }
     else{
       alert("Greška u aktivaciji Korisnika s id=" + id + "!");
     }
   }
   
}
