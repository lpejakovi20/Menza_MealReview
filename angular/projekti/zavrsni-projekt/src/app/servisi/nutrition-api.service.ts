import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NutritionApiService {
  restServis?: string = environment.restServis;
  pythonRestServis?: string = environment.pythonRestServis;
  
  constructor() { }

  async getNutritionItems(tekst: string) {

    //let odgovor = await fetch(this.restServis + "nutrition/items?tekst=" + tekst + "&korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka);
    let odgovor = await fetch(this.pythonRestServis + "nutrition/items?tekst=" + tekst + "&korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka);

    let podaci = await odgovor.json();

    return podaci;
  }
}
