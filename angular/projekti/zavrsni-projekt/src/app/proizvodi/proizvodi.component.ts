import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DatotekeService } from '../servisi/datoteke.service';
import { KorisniciService } from '../servisi/korisnici.service';
import { ProizvodiService } from '../servisi/proizvodi.service';

@Component({
  selector: 'app-proizvodi',
  templateUrl: './proizvodi.component.html',
  styleUrls: ['./proizvodi.component.css']
})
export class ProizvodiComponent implements OnInit {

  proizvodi?: Array<any>

  @Output() prikaziDetaljeMenija = new EventEmitter<number>();

  constructor(private proizvodiServis : ProizvodiService, private korisniciServis: KorisniciService, private router: Router, private datotekeServis: DatotekeService){
  }
  async ngOnInit() {
    let korisnik = sessionStorage.getItem("korisnik");
    console.log("Korisnik: ");
    console.log(korisnik);
    if(korisnik == null){
      this.router.navigate(["/pocetna"]);
    }
    else{
      this.dohvatiProizvode();
    }
  }

  async dohvatiProizvode(){
    let odgovor = await this.proizvodiServis.dajProizvode();
    this.proizvodi = odgovor;
    this.postaviResurseProizvoda();
  }

  prikaziVise(idMenija: number) {
    this.prikaziDetaljeMenija.emit(idMenija);
  }

  async postaviResurseProizvoda(){
    if(this.proizvodi)
    for (const p of this.proizvodi) {
      if (p.naziv) {
        p.slikaSrc = await this.prikaziSlikuRecenzije(p.naziv + ".jpg");
      }
    }
  }

  async prikaziSlikuRecenzije(naziv: string){
    let url = await this.datotekeServis.getImage(naziv);

    if(url=="data:image/jpeg;base64,RXJyb3IgcmV0cmlldmluZyBmaWxl") return "";
    else return url;
  }
}
