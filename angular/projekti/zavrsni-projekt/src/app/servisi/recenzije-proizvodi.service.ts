import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecenzijeProizvodiService {

  restServis?: string = environment.restServis;
  recenzije? : Array<any>
  recenzija? : any
  
  constructor() { }

  async dajRecenzije(odobreno: number) {
    let o = (await fetch(this.restServis + "recenzijeProizvoda?odobreno=" + odobreno + "&korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka)) as Response;
    if (o.status == 200) {
      let r = JSON.parse(await o.text());
      console.log(r);
      this.recenzije = r;
      return this.recenzije;
    }
    else return new Array<any>;
  }

  async dodajRecenziju(ocjena:number, sadrzaj: string, proizvod_id: number, korisnik_id: number, slika : any, video : any){
    let tijelo = {
      ocjena : ocjena,
      sadrzaj : sadrzaj,
      slika : slika,
      video : video,
      proizvod_id : proizvod_id,
      korisnik_id : korisnik_id
    };
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let parametri = {
        method: 'POST',
        body: JSON.stringify(tijelo),
        headers: zaglavlje
    }
    let odgovor = (await fetch(this.restServis + "recenzijeProizvoda?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka,parametri)) as Response;
    if(odgovor.status==200){
      return true;
    }
    else return false;
  }

  async ukloniRecenziju(id : number){

    let zaglavlje = new Headers();
	  zaglavlje.set("Content-Type","application/json");

    let parametri = {
        method: 'DELETE',
        body: JSON.stringify({ id : id }),
        headers: zaglavlje
    }
    
    let odgovor = await fetch(this.restServis + "recenzijeProizvoda/" + id + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka, parametri)

    if(odgovor.status==200){
      return true;
    }
    else return false;
  }

  async odobriRecenziju(id : number){
  
    let zaglavlje = new Headers();
	  zaglavlje.set("Content-Type","application/json");

    let odobreno = 1;
    let parametri = {
        method: 'PUT',
        body: JSON.stringify({ odobreno: odobreno }),
        headers: zaglavlje
    }
    let o = (await fetch(this.restServis + "recenzijeProizvoda/" + id + "/odobri" + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka, parametri)) as Response;
    return o;
  }

  async dajRecenzijeOdabranogProizvoda(proizvod_id : number){
    let zaglavlje = new Headers();
	  zaglavlje.set("Content-Type","application/json");
	  
    let parametri = {
      headers: zaglavlje
    };

    let o = (await fetch(this.restServis + "recenzijeOdabranogProizvoda/" + proizvod_id + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka,parametri)) as Response;
    if (o.status == 200) {
      let r = JSON.parse(await o.text());
      console.log(r);
      this.recenzije = r;
      return this.recenzije;
    }
    else return new Array<any>;
  }
}
