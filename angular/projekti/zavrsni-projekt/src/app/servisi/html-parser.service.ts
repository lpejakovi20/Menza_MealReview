import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HtmlParserServiceService {

  restServis?: string = environment.restServis;
  pythonRestServis?: string = environment.pythonRestServis;

  constructor() { }

  getMenuItems(content: string){
    content = content.replace(/<[^>]*>/g,'');
    let items = content.split("\n");
    items.splice(0,2);
    items.splice(items.length - 1, 1);

    return items;
  }

  createMenus(elementi: NodeListOf<Element>){
    let rucak : Array<string>[]= [];
    let vecera : Array<string>[]= [];
    for(let i = 0;i<7;i++){
      let items = this.getMenuItems(elementi[i].innerHTML);

      if(i < 3) rucak.push(items);
      else if(i==3) continue;
      else vecera.push(items);
    }

    console.log(rucak);
    console.log(vecera);
    
    return {
      rucak,
      vecera
    }
  }
  
  async retrieveHTMLContent(url: string) {

    //let odgovor = await fetch(this.restServis + "htmlParse?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka);
    let odgovor = await fetch(this.pythonRestServis + "htmlParse?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka);

    let html = await odgovor.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    let elementi = doc.querySelectorAll('.jelovnik-date-content .col-md-4');

    return this.createMenus(elementi);
  }
}
