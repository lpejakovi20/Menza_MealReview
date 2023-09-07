import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenijiService {

  restServis?: string = environment.restServis;
  meniji? : Array<any>
  meni? : any

  constructor() { }

  async dajMenije() {
    let o = (await fetch(this.restServis + "meniji?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka)) as Response;
    if (o.status == 200) {
      let r = JSON.parse(await o.text());
      console.log(r);
      this.meniji = r;
      return this.meniji;
    }
    else return new Array<any>;
  }

  async dajMeni(id : string){
    let zaglavlje = new Headers();
	  zaglavlje.set("Content-Type","application/json");
	  
    let parametri = {
      headers: zaglavlje
    };

    let o = (await fetch(this.restServis + "meniji/" + id + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka,parametri)) as Response;
    if (o.status == 200) {
      let x = await o.text();
      if(x.length==0){
        console.log("meni nije pronadjen!");
        return null;
      }
      else {
        let r = JSON.parse(x);
        console.log(r);
        this.meni = r;
        return this.meni;
      }
    }
    else return null;
  }

  async dodajMeni(naziv: string, opis:string, slika: any){
    let tijelo = {
      naziv : naziv,
      opis : opis,
      slika : slika
    };
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let parametri = {
        method: 'POST',
        body: JSON.stringify(tijelo),
        headers: zaglavlje
    }
    let odgovor = (await fetch(this.restServis + "meniji?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka,parametri)) as Response;
    if(odgovor.status==200){
      return true;
    }
    else return false;
  }
}
