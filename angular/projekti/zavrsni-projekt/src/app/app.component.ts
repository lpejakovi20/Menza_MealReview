import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { KorisniciService } from './servisi/korisnici.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'zavrsniProjekt';
  putanja='popis';
  
  constructor(public korisniciServis: KorisniciService, private router: Router){
    
  }
  ngOnInit() : void {
    this.korisniciServis.provjeriPrijavljenogKorisnika();
  }
  
  odjaviSe() {
    sessionStorage.removeItem("korisnik");
    this.router.navigate(["/pocetna"]);
    window.location.reload();
  }
}
