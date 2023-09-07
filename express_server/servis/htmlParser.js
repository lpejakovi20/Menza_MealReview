const ProvjeraAutorizacije = require("./provjeraAutorizacije.js");

exports.getHTML = function (zahtjev, odgovor) {
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
    fetch("https://www.scvz.unizg.hr/jelovnik-varazdin/")
        .then(response => response.text())
        .then(html => {
          odgovor.send(html);
        }).catch((greska) => {
            odgovor.json(greska);
        });
  }
};