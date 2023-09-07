import { Component, EventEmitter, Output } from '@angular/core';
import { MenijiService } from '../servisi/meniji.service';
import { Router } from '@angular/router';
import { DatotekeService } from '../servisi/datoteke.service';

@Component({
  selector: 'app-meniji',
  templateUrl: './meniji.component.html',
  styleUrls: ['./meniji.component.css']
})
export class MenijiComponent {
  meniji?: Array<any>
  putanjaDetalji?: string = "/detaljiMenija/"

  @Output() prikaziDetaljeMenija = new EventEmitter<number>();
  
  constructor(private menijiServis : MenijiService, private router : Router, private datotekeServis: DatotekeService){
  }
  ngOnInit(): void {
    let korisnik = sessionStorage.getItem("korisnik");
    if(korisnik == null){
      this.router.navigate(["/pocetna"]);
    }
    else{
      this.dohvatiMenije();
    }
  }

  async dohvatiMenije(){
    let odgovor = await this.menijiServis.dajMenije();
    this.meniji = odgovor;

    this.postaviStavkeMenija();
    this.postaviResurseMenija();
  }

  prikaziVise(idMenija: number) {
    this.prikaziDetaljeMenija.emit(idMenija);
  }

  async postaviStavkeMenija(){
    if(this.meniji)
    for (const m of this.meniji) {
      if (m.opis) {
        let stavke = m.opis.split(",");
        m.stavkeMenija = stavke;
      }
    }
  }

  async postaviResurseMenija(){
    if(this.meniji)
    for (const m of this.meniji) {
      if (m.slika) {
        m.slikaSrc = await this.prikaziSlikuRecenzije(m.slika);
      }
    }
  }

  async prikaziSlikuRecenzije(naziv: string){
    let url = await this.datotekeServis.getImage(naziv);
    return url;
  }
}
