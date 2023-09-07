import { Component, OnInit } from '@angular/core';
import { HtmlParserServiceService } from '../servisi/html-parser.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private htmlParserServis:HtmlParserServiceService) {

  }

  rucak : Array<string>[]= [];
  vecera : Array<string>[]= [];

  naslov?: any;

  ngOnInit(): void {
    this.dohvatiDnevneMenije();
  }

  getDate() {
    return new Date();
  }

  async dohvatiDnevneMenije(){
    let url = 'https://www.scvz.unizg.hr/jelovnik-varazdin/';
    let odgovor = await this.htmlParserServis.retrieveHTMLContent(url);
    this.rucak = odgovor.rucak;
    this.vecera = odgovor.vecera;
  }
}
