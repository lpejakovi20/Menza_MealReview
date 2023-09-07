const ProvjeraAutorizacije = require("./provjeraAutorizacije.js");

exports.getItems = function (zahtjev, odgovor) {

  let autorizacija = new ProvjeraAutorizacije();
  let kod = autorizacija.provjeri(zahtjev);

  if(kod == 400){
      odgovor.status(400);
      let poruka = { greska: "nevaljani zahtjev, nedostaju korime i lozinka" }
      odgovor.send(JSON.stringify(poruka));
  }
  else if(kod == 401){
      odgovor.status(401);
      let poruka = { greska: "neautorizirani pristup" }
      odgovor.send(JSON.stringify(poruka));
  }
  else{
    let app_id = "app_id"
    let app_key = "app_key" 
    let url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + zahtjev.query.tekst + "&app_id=" + app_id + "&app_key=" + app_key;
    fetch(url)
    .then(response => response.json())
    .then(podaci => {
      odgovor.send(podaci.hits);
    }).catch((greska) => {
        odgovor.json(greska);
    });
  }
};



