import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProizvodiComponent } from './proizvodi/proizvodi.component';
import { MenijiComponent } from './meniji/meniji.component';
import { DetaljiMenijaComponent } from './detalji-menija/detalji-menija.component';
import { RouterModule, Routes } from '@angular/router';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { DetaljiProizvodaComponent } from './detalji-proizvoda/detalji-proizvoda.component';
import { DodajNovoComponent } from './dodaj-novo/dodaj-novo.component';
import { AktivacijaComponent } from './aktivacija/aktivacija.component';
import { OdobriRecenzijuComponent } from './odobri-recenziju/odobri-recenziju.component';

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
  declarations: [
    AppComponent,
    PocetnaComponent,
    ProizvodiComponent,
    MenijiComponent,
    DetaljiMenijaComponent,
    PrijavaComponent,
    RegistracijaComponent,
    DetaljiProizvodaComponent,
    DodajNovoComponent,
    AktivacijaComponent,
    OdobriRecenzijuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
