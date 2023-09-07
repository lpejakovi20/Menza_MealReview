import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProizvodiService {

  restServis?: string = environment.restServis;
  proizvodi? : Array<any>
  proizvod? : any

  constructor() { }

  async dajProizvode() {
    let o = (await fetch(this.restServis + "proizvodi?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka)) as Response;
    if (o.status == 200) {
      let r = JSON.parse(await o.text());
      console.log(r);
      this.proizvodi = r;
      return this.proizvodi;
    }
    else return new Array<any>;
  }

  async dajProizvod(id : string){
    let zaglavlje = new Headers();
	  zaglavlje.set("Content-Type","application/json");
	  
    let parametri = {
      headers: zaglavlje
    };

    let o = (await fetch(this.restServis + "proizvodi/" + id + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka,parametri)) as Response;
    if (o.status == 200) {
      let x = await o.text();
      if(x.length==0){
        console.log("meni nije pronadjen!");
        return null;
      }
      else {
        let r = JSON.parse(x);
        console.log(r);
        this.proizvod = r;
        return this.proizvod;
      }
    }
    else return null;
  }

  async dodajProizvod(naziv: string, opis:string){
    let tijelo = {
      naziv : naziv,
      opis : opis,
      slika : null
    };
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let parametri = {
        method: 'POST',
        body: JSON.stringify(tijelo),
        headers: zaglavlje
    }
    let odgovor = (await fetch(this.restServis + "proizvodi?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka,parametri)) as Response;
    if(odgovor.status==200){
      return true;
    }
    else return false;
  }

  async dajProizvodPremaNazivu(naziv : string){
    let zaglavlje = new Headers();
	  zaglavlje.set("Content-Type","application/json");
	  
    let parametri = {
      headers: zaglavlje
    };

    let o = (await fetch(this.restServis + "dajProizvodPremaNazivu/" + naziv + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka,parametri)) as Response;
    if (o.status == 200) {
      let x = await o.text();
      if(x.length==0){
        console.log("proizvod nije pronadjen!");
        return null;
      }
      else {
        let r = JSON.parse(x);
        console.log(r);
        this.proizvod = r;
        return this.proizvod;
      }
    }
    else return null;
  }
}
