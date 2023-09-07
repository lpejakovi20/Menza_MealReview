import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatotekeService {

  restServis?: string = environment.restServis;
  pythonRestServis?: string = environment.pythonRestServis;

  constructor() { }

  async getImage(fileName: string) {
    //let imageData = await fetch(this.restServis + "datoteka/" + fileName + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka).then(response => response.arrayBuffer());
    let imageData = await fetch(this.pythonRestServis + "datoteka/" + fileName + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka).then(response => response.arrayBuffer());
    const base64Data = btoa(String.fromCharCode(...new Uint8Array(imageData)));
    const dataUrl = `data:image/jpeg;base64,${base64Data}`;
    return dataUrl;
  }

  async getVideo(fileName: string) {
    //let videoData = await fetch(this.restServis + "datoteka/" + fileName + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka).then(response => response.blob());
    let videoData = await fetch(this.pythonRestServis + "datoteka/" + fileName + "?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka).then(response => response.blob());
    const videoUrl = URL.createObjectURL(videoData);
    return videoUrl;
  }

  async uploadImage(url: string, naziv: string){
    let tijelo = {
      url : url,
      naziv : naziv
    };
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let parametri = {
        method: 'POST',
        body: JSON.stringify(tijelo),
        headers: zaglavlje
    }
    //let odgovor = (await fetch(this.restServis + "datoteka?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka, parametri)) as Response;
    let odgovor = (await fetch(this.pythonRestServis + "datoteka?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka, parametri)) as Response;

    if(odgovor.status==200){
      return true;
    }
    else return false;
  }

  async uploadImageFile(file : File, naziv: string) {

    const formData = new FormData();
    formData.append('file', file, naziv);

    console.log("File u servisima: ");
    console.log(file);
    console.log(formData);
    try {
      const response = await fetch(this.restServis + "datotekaUpload?korime=" + environment.restKorime + "&lozinka=" + environment.restLozinka, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response:', responseData);
        return true;
      } else {
        console.error('Error:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
 }
  
}
