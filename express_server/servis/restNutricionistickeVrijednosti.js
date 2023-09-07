const NutricionistickeVrijednostiDAO = require("./nutricionistickeVrijednostiDAO");
const ProvjeraAutorizacije = require("./provjeraAutorizacije.js");

exports.getNutricionistickeVrijednosti = function (zahtjev, odgovor) {
    odgovor.type("application/json")

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
        let ndao = new NutricionistickeVrijednostiDAO();
        let id = zahtjev.params.id;
        ndao.daj(id).then((proizvod) => {
            console.log(proizvod);
            odgovor.send(JSON.stringify(proizvod));
        });
    }
}

exports.postNutricionistickeVrijednosti = function (zahtjev, odgovor) {
    odgovor.type("application/json")

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
        let podaci = zahtjev.body;
        let ndao = new NutricionistickeVrijednostiDAO();
        ndao.dodaj(podaci).then((poruka) => {
            odgovor.send(JSON.stringify(poruka));
        });
    }
}