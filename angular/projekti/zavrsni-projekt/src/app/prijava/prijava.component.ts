import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { KorisniciService } from '../servisi/korisnici.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})


export class PrijavaComponent {

  ulogaKorisnika?: any;

  gumb?: any

  constructor(private korisniciServis : KorisniciService, private router : Router){
    this.gumb = <HTMLDListElement>document.getElementById('Salji');
  }

  async onSubmit(e : any) {

    e.preventDefault();

    let korime = <HTMLInputElement>document.getElementById("korime");
    let lozinka = <HTMLInputElement>document.getElementById("lozinka");

    let izrazKorime = /^[A-Za-z\d]{3,30}$/
    let izrazLozinka = /^[A-Za-z\d@$!%*#?&]{3,20}$/

    if(korime!=null && lozinka!=null){
      if(!izrazKorime.test(korime.value) || !izrazLozinka.test(lozinka.value)){
        alert("Neispravan unos!");
        e.preventDefault();
      }
      else{
        let korisnik = await this.korisniciServis.prijavi(korime.value, lozinka.value);
        if(korisnik==null) alert("Ne postoji korisnik s navedenim podacima!");
        else if(!korisnik.aktiviran) alert("Vaš račun nije aktiviran, pričekajte dok ga administrator ne aktivira!");
        else {
          this.router.navigate(['/','pocetna']).then(() => {
            window.location.reload();
          });
        }
      }
    }
  }
}
