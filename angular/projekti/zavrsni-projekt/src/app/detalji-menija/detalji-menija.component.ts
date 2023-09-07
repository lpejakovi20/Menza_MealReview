import { Component, Input, numberAttribute } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatotekeService } from '../servisi/datoteke.service';
import { KorisniciService } from '../servisi/korisnici.service';
import { MenijiService } from '../servisi/meniji.service';
import { RezencijeMenijiService } from '../servisi/rezencije-meniji.service';

@Component({
  selector: 'app-detalji-menija',
  templateUrl: './detalji-menija.component.html',
  styleUrls: ['./detalji-menija.component.css']
})
export class DetaljiMenijaComponent {

  recenzije?: Array<any>;
  elementNoveRecenzije?: any;

  nazivSlike = "";
  nazivVidea = "";

  ekstenzijaSlike?: any
  ekstenzijaVidea?: any

  prosjecnaRecenzija?: any = 0;

  @Input() meni:any;

  constructor(private menijiServis:MenijiService, private activatedroute:ActivatedRoute, private recenzijeMenijaServis: RezencijeMenijiService,
    private korisniciServis: KorisniciService, private datotekeServis: DatotekeService, private router: Router){}

  async ngOnInit(){
    let korisnik = sessionStorage.getItem("korisnik");
    if(korisnik == null){
      this.router.navigate(["/pocetna"]);
    }
    else{
      this.elementNoveRecenzije = <HTMLDivElement>document.getElementById('novaRecenzija');
      this.elementNoveRecenzije.style.display = "none";

      this.activatedroute.paramMap.subscribe(async parametri => {
        let idMenija = parametri.get("id");
        if(idMenija!=null){
          this.meni = await this.menijiServis.dajMeni(idMenija);
          this.prikazi();
          this.dohvatiRecenzije();

          this.prikaziSliku();
        }
      });
    }
  }

  parseDate(dateString: string) {
    return new Date(Date.parse(dateString));
  }

  async prikaziSliku(){
    let url = await this.datotekeServis.getImage(this.meni.slika);
    let imgElement = <HTMLImageElement>document.getElementById('slika');
    imgElement.src = url;
    imgElement.alt = "test";
  }

  prikazi(){
    if(this.meni!=null){
      this.prikaziMeni(this.meni);
    } else {
      //this.naziv="Film ne postoji!";
    }

  }

  prikaziMeni(meni : any){
    
    let naziv = <HTMLInputElement>document.getElementById('naziv');
    naziv.innerHTML = meni.naziv;

    let opis = <HTMLInputElement>document.getElementById('opis');
    opis.innerHTML = meni.opis;
  }

  async dohvatiRecenzije(){
    let odgovor = await this.recenzijeMenijaServis.dajRecenzijeOdabranogMenija(this.meni.id);
    this.recenzije = odgovor;
    this.postaviResurseRecenzija();
    this.izracunajProsjecnuRecenziju();
  }

  async postaviResurseRecenzija(){
    if(this.recenzije)
    for (const r of this.recenzije) {
      if (r.slika) {
        r.slikaSrc = await this.prikaziSlikuRecenzije(r.slika);
      }
      if (r.video) {
        r.videoSrc = await this.prikaziVideoRecenzije(r.video);
      }
    }
  }

  async izracunajProsjecnuRecenziju(){
    let ukupno = 0;
    if(this.recenzije && this.recenzije?.length > 0){
      for (const r of this.recenzije) {
        ukupno += r.ocjena;
      }
      this.prosjecnaRecenzija = (ukupno/(this.recenzije?.length)).toFixed(1);
    }
  }

  async PohraniRecenziju(e: any) {

    e.preventDefault();

    let ocjena = <HTMLInputElement>document.getElementById("ocjena");
    let sadrzaj = <HTMLTextAreaElement>document.getElementById("sadrzaj");
    
    let izrazOcjena = /^[1-9]$|^10$/
    let izrazSadrzaj = /^[A-Za-z\s,\.]{1,250}$/

    if(!izrazOcjena.test(ocjena.value) || !izrazSadrzaj.test(sadrzaj.value)){
        alert("Neispravan unos!");
        e.preventDefault();
    }
    else{
      this.korisniciServis.provjeriPrijavljenogKorisnika();
      let korisnik = this.korisniciServis.prijavljeniKorisnik;

      const imageInput = <HTMLInputElement>document.getElementById('imageInput');
      const videoInput = <HTMLInputElement>document.getElementById('videoInput');

      if(imageInput.files && imageInput.files.length > 0){

        if(this.provjeriVelicinuVidea(videoInput)){
          await this.uploadajSliku(imageInput);
          await this.uploadajVideo(videoInput);
  
          await this.dodajRecenziju(ocjena,sadrzaj,korisnik.id);
  
          imageInput.value = '';
          videoInput.value = ''; 
        }
        else{
          alert('Video prelazi limit od 1MB');
          videoInput.value = ''; 
        }
      }
      else{
        alert('Obavezno je dodati sliku!');
      }

    }
  }

  provjeriVelicinuVidea(videoInput: HTMLInputElement){
    let file;
    if (videoInput.files && videoInput.files.length > 0) {
      file = videoInput.files[0];
    }  
    const maxSizeInBytes = 1024 * 1024; // 1 MB

    if (file && file.size > maxSizeInBytes) {
      return false;
    }
    return true;
  }

  async uploadajSliku(imageInput : HTMLInputElement){

    if (imageInput.files && imageInput.files.length > 0) {
      if(await this.uploadDatoteke(imageInput, "slika")) alert("Slika uspješno dodana!");
      else alert("Neuspješno dodavanje slike!");
    }
  }

  async uploadajVideo(videoInput: HTMLInputElement){

    if (videoInput.files && videoInput.files.length > 0) {
      if(await this.uploadDatoteke(videoInput, "video")) alert("Video uspješno dodan!");
      else alert("Neuspješno dodavanje videa!");
    }
  }

  async dodajRecenziju(ocjena : HTMLInputElement, sadrzaj: HTMLTextAreaElement, korisnik_id : number){

    let slika;
    if(this.nazivSlike == "") slika = null;
    else slika = this.nazivSlike + "." + this.ekstenzijaSlike;

    let video;
    if(this.nazivVidea == "") video = null;
    else video = this.nazivVidea + "." + this.ekstenzijaVidea;

    let dodan = await this.recenzijeMenijaServis.dodajRecenziju(parseInt(ocjena.value),sadrzaj.value,this.meni.id,korisnik_id, 
      slika, video);
      
      if(dodan){
        sadrzaj.value = "";
        ocjena.value = "";
        this.elementNoveRecenzije.style.display = "none";
        alert("Recenzija uspješno pohranjena, vidljiva će biti tek nakon što je administrator odobri!");
      }
      else{
        alert("Neuspješna pohrana recenzije!");
      }
  }

  async uploadDatoteke(fileInput: HTMLInputElement, vrsta: string){
    let file;
    let ekstenzija;
    if(fileInput && fileInput.files) {
      file = fileInput.files[0];
      ekstenzija = file.name.split('.').pop();
    }
    else return false;
    
    let naziv = this.generateRandomFileName();
    if(vrsta=="slika") {
      this.nazivSlike = naziv;
      this.ekstenzijaSlike = ekstenzija;
    }
    else {
      this.nazivVidea = naziv;
      this.ekstenzijaVidea = ekstenzija;
    }

    let uspjeh = false;
    if(file) {
      uspjeh = await this.datotekeServis.uploadImageFile(file,naziv);
    }
    return uspjeh;
  }

  async otvoriPolje(e: any) {
    if(this.elementNoveRecenzije.style.display == "none") this.elementNoveRecenzije.style.display = "block";
    else this.elementNoveRecenzije.style.display = "none";
  }

  generateRandomFileName(): string {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${timestamp}_${randomString}`;
  }

  async prikaziSlikuRecenzije(naziv: string){
    let url = await this.datotekeServis.getImage(naziv);
    return url;
  }

  async prikaziVideoRecenzije(naziv: string){
    let url = await this.datotekeServis.getVideo(naziv);
    return url;
  }
}
