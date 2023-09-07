import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from '../servisi/korisnici.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent {

  constructor(private korisniciServis : KorisniciService,private router : Router){
  }

  async onSubmit(e: any) {

    e.preventDefault();

    let ime = <HTMLInputElement>document.getElementById("ime");
    let prezime = <HTMLInputElement>document.getElementById("prezime");
    let korime = <HTMLInputElement>document.getElementById("korime");
    let lozinka = <HTMLInputElement>document.getElementById("lozinka");
    let email = <HTMLInputElement>document.getElementById("email");

    let izrazIme = /^[A-Za-z\s]{1,50}$/
    let izrazPrezime = /^[A-Za-z\s]{1,100}$/
    let izrazKorime = /^[A-Za-z\d]{6,30}$/
    let izrazLozinka = /^[A-Za-z\d@$!%*#?&]{3,20}$/
    let izrazEmail = /^[\w\d]{2,}@(\w{2,}\.){1,2}\w{2,}$/

    if(!izrazIme.test(ime.value) || !izrazPrezime.test(prezime.value) || !izrazKorime.test(korime.value) || 
    !izrazLozinka.test(lozinka.value) || !izrazEmail.test(email.value)){
        alert("Neispravan unos!");
        e.preventDefault();
    }
    else if(await this.korisniciServis.dajKorisnika(korime.value) != null) {
      alert("Registracija nije uspjela, odabrano korisničko ime je već zauzeto!");
    }
    else{
      let registriran = await this.korisniciServis.registriraj(ime.value, prezime.value, korime.value, lozinka.value, email.value);
      if(registriran){
        alert("Registracija uspješna!");
        this.router.navigate(['/','prijava']);
      }
      else{
        alert("Registracija nije uspjela!");
      }
    }
  }
}
