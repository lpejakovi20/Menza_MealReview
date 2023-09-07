import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AktivacijaComponent } from './aktivacija/aktivacija.component';
import { DetaljiMenijaComponent } from './detalji-menija/detalji-menija.component';
import { DetaljiProizvodaComponent } from './detalji-proizvoda/detalji-proizvoda.component';
import { DodajNovoComponent } from './dodaj-novo/dodaj-novo.component';
import { MenijiComponent } from './meniji/meniji.component';
import { OdobriRecenzijuComponent } from './odobri-recenziju/odobri-recenziju.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { ProizvodiComponent } from './proizvodi/proizvodi.component';
import { RegistracijaComponent } from './registracija/registracija.component';

const routes:Routes = [
  {path: "pocetna", component:PocetnaComponent},
  {path: "proizvodi", component:ProizvodiComponent},
  {path: "meniji", component:MenijiComponent},
  {path: "detaljiMenija/:id", component:DetaljiMenijaComponent},
  {path: "detaljiProizvoda/:id", component:DetaljiProizvodaComponent},
  {path: "dodajNovo", component:DodajNovoComponent},
  {path: "odobriRecenziju", component:OdobriRecenzijuComponent},
  {path: "aktivacija", component:AktivacijaComponent},
  {path: "prijava", component:PrijavaComponent},
  {path: "registracija", component:RegistracijaComponent},
  {path: "", redirectTo:"pocetna", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
