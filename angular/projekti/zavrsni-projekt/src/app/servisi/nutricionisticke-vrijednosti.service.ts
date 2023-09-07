import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NutricionistickeVrijednostiService {

  restServis?: string = environment.restServis;
  nutricionistickeVrijednosti?: any;
  
  constructor() { }

  async dodajNutricionistickeVrijednosti(podaci: any, proizvod_id: number){
    
    let tijelo = this.sastaviTijelo(podaci, proizvod_id);

    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let parametri = {
        method: 'POST',
        body: JSON.stringify(tijelo),
        headers: zaglavlje
    }
    let odgovor = (await fetch(this.restServis + "nutricionistickeVrijednosti?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka,parametri)) as Response;
    if(odgovor.status==200){
      return true;
    }
    else return false;
  }

  sastaviTijelo(podaci: any, proizvod_id: number){
    let nutrijenti = podaci.recipe.totalNutrients;

    let numOfServings = podaci.recipe.yield;

    let tijelo = {
      kalorije : podaci.recipe.calories / numOfServings,
      masti : nutrijenti.FAT.quantity / numOfServings,
      zasicene_masti : nutrijenti.FASAT.quantity / numOfServings,
      ugljikohidrati : nutrijenti.CHOCDF.quantity / numOfServings,
      vlakna : nutrijenti.FIBTG.quantity / numOfServings,
      seceri : nutrijenti.SUGAR.quantity / numOfServings,
      protein : nutrijenti.PROCNT.quantity / numOfServings,
      kolesterol : nutrijenti.CHOLE.quantity / numOfServings,
      natrij : nutrijenti.NA.quantity / numOfServings,
      kalcij : nutrijenti.CA.quantity / numOfServings,
      magnezij : nutrijenti.MG.quantity / numOfServings,
      zeljezo : nutrijenti.FE.quantity / numOfServings,
      kalij : nutrijenti.K.quantity / numOfServings,
      cink : nutrijenti.ZN.quantity / numOfServings,
      fosfor : nutrijenti.P.quantity / numOfServings,
      vitamin_A : nutrijenti.VITA_RAE.quantity / numOfServings,
      vitamin_C : nutrijenti.VITC.quantity / numOfServings,
      vitamin_B1 : nutrijenti.THIA.quantity / numOfServings,
      vitamin_B2 : nutrijenti.RIBF.quantity / numOfServings,
      vitamin_B3 : nutrijenti.NIA.quantity / numOfServings,
      vitamin_B6 : nutrijenti.VITB6A.quantity / numOfServings,
      vitamin_B9 : nutrijenti.FOLAC.quantity / numOfServings,
      vitamin_B12 : nutrijenti.VITB12.quantity / numOfServings,
      vitamin_D : nutrijenti.VITD.quantity / numOfServings,
      vitamin_E : nutrijenti.TOCPHA.quantity / numOfServings,
      vitamin_K : nutrijenti.VITK1.quantity / numOfServings,
      voda : nutrijenti.WATER.quantity / numOfServings,
      proizvod_id : proizvod_id
    };

    return tijelo;
  }

  async dajNutricionistickeVrijednosti(id : number){
    let zaglavlje = new Headers();
	  zaglavlje.set("Content-Type","application/json");
	  
    let parametri = {
      headers: zaglavlje
    };

    let o = (await fetch(this.restServis + "nutricionistickeVrijednosti/" + id + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka,parametri)) as Response;
    if (o.status == 200) {
      let x = await o.text();
      if(x.length==0){
        console.log("odabrani proizvod nema nutricionistickih vrijednosti!");
        return null;
      }
      else {
        let r = JSON.parse(x);
        console.log(r);
        this.nutricionistickeVrijednosti = r;
        return this.nutricionistickeVrijednosti;
      }
    }
    else return null;
  }
}
