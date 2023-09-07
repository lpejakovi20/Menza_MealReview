import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {
  restServis?: string = environment.restServis;
  pythonRestServis? : string = environment.pythonRestServis;
  public prijavljeniKorisnik: any = null;

  ulogaKorisnika? : number;
  korisnici?: Array<any>;
  korisnik?: any;

  constructor() { }

  async prijavi(korime: string, lozinka:string){
    let tijelo = {
      korime: korime,
      lozinka: lozinka
    };
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let parametri = {
        method: 'POST',
        body: JSON.stringify(tijelo),
        headers: zaglavlje
    }
    //let odgovor = (await fetch(this.restServis + "korisnici/" + korime + "/prijava?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka, parametri)) as Response;
    let odgovor = (await fetch(this.pythonRestServis + "korisnici/" + korime + "/prijava?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka, parametri)) as Response;

    if(odgovor.status==200){
      let podaci = await odgovor.text();

      let korisnik = JSON.parse(podaci);
      this.postaviKorisnika(korisnik)
      
      return korisnik;
    }
    else return null;
  }

  async dajKorisnika(korime : string){
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    var csrftoken = getCookie('csrftoken');
    zaglavlje.append('X-CSRFToken', csrftoken);
	  
    let parametri = {
      headers: zaglavlje
    };

    //let o = (await fetch(this.restServis + "korisnici/" + korime + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka,parametri)) as Response;
    let o = (await fetch(this.pythonRestServis + "korisnici/" + korime + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka,parametri)) as Response;

    if (o.status == 200) {
      let x = await o.text();
      if(x.length==0){
        console.log("korisnik nije pronadjen!");
        return null;
      }
      else {
        let r = JSON.parse(x);
        console.log(r);
        this.korisnik = r;
        return this.korisnik;
      }
    }
    else return null;
  }
  

  async dajUlogiranogKorisnika(){
    let o = (await fetch(this.restServis + "ulogiraniKorisnik?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka)) as Response;
    if(o.status==200){
      let podaci = await o.text();
      let uloga = JSON.parse(podaci);
      console.log("dohvacena uloga: ");
      console.log(uloga);
      this.ulogaKorisnika = uloga.uloga;
      console.log("uloga u korisniciServis: " + this.ulogaKorisnika);

    }
    else{
      alert("Dohvaćanje uloge nije uspjelo!");
    }
  }

  public async postaviKorisnika(korisnik: any) {
    this.prijavljeniKorisnik = korisnik;
    sessionStorage.setItem("korisnik", JSON.stringify(korisnik));
  }

  public provjeriPrijavljenogKorisnika() {
    let korisnikSesija = sessionStorage.getItem("korisnik");
    if (korisnikSesija) {
      this.prijavljeniKorisnik = JSON.parse(korisnikSesija);
    }
  }

  async registriraj(ime: string, prezime: string, korime: string, lozinka: string, email: string){
    
    let tijelo = {
      ime : ime,
      prezime : prezime,
      korime: korime,
      lozinka: lozinka,
      email : email
    };
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    var csrftoken = getCookie('csrftoken');
    zaglavlje.append('X-CSRFToken', csrftoken);

    let parametri = {
        method: 'POST',
        body: JSON.stringify(tijelo),
        headers: zaglavlje
    }
    //let odgovor = (await fetch(this.restServis + "korisnici?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka,parametri)) as Response;
    let odgovor = (await fetch(this.pythonRestServis + "korisnici?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka,parametri)) as Response;
    if(odgovor.status==200){
      return true;
    }
    else return false;
  }

  async dajNeaktiviraneKorisnike() {
    //let o = (await fetch(this.restServis + "korisnici?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka)) as Response;
    let o = (await fetch(this.pythonRestServis + "korisnici?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka)) as Response;
    if (o.status == 200) {
      let r = JSON.parse(await o.text());
      console.log(r);
      this.korisnici = r;
      return this.korisnici;
    }
    else return new Array<any>;
  }

  async ukloniKorisnika(id : number){

    let zaglavlje = new Headers();
	  zaglavlje.set("Content-Type","application/json");

    var csrftoken = getCookie('csrftoken');
    zaglavlje.append('X-CSRFToken', csrftoken);

    let parametri = {
        method: 'DELETE',
        body: JSON.stringify({ id : id }),
        headers: zaglavlje
    }
    
    //let odgovor = await fetch(this.restServis + "korisnici/" + id + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka, parametri)
    let odgovor = await fetch(this.pythonRestServis + "korisnici/" + id + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka, parametri)

    if(odgovor.status==200){
      return true;
    }
    else return false;
  }

  async aktivirajKorisnika(id : number){
  
    let zaglavlje = new Headers();
	  zaglavlje.set("Content-Type","application/json");

    let aktiviran = 1;
    let parametri = {
        method: 'PUT',
        body: JSON.stringify({ aktiviran: aktiviran }),
        headers: zaglavlje
    }
    //let o = (await fetch(this.restServis + "korisnici/" + id + "/aktivacija?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka, parametri)) as Response;
    let o = (await fetch(this.pythonRestServis + "korisnici/" + id + "/aktivacija?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka, parametri)) as Response;
    return o;
  }
}

function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || '';
  }
  return '';
}
