const ProizvodDAO = require("./proizvodDAO.js");
const ProvjeraAutorizacije = require("./provjeraAutorizacije.js");

exports.getProizvodi = function (zahtjev, odgovor) {
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
        let pdao = new ProizvodDAO();
        pdao.dajSve().then((proizvodi) => {
            console.log(proizvodi);
            odgovor.send(JSON.stringify(proizvodi));
        });
    }
}


exports.postProizvodi = function (zahtjev, odgovor) {
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
        let pdao = new ProizvodDAO();
        pdao.dodaj(podaci).then((poruka) => {
            odgovor.send(JSON.stringify(poruka));
        });
    }
}

exports.getProizvod = function (zahtjev, odgovor) {
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
    else {
        let pdao = new ProizvodDAO();
        let id = zahtjev.params.id;
        pdao.daj(id).then((proizvod) => {
            console.log(proizvod);
            odgovor.send(JSON.stringify(proizvod));
        });
    }
}

exports.getProizvodPremaNazivu = function (zahtjev, odgovor) {
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
    else {
        let pdao = new ProizvodDAO();
        let naziv = zahtjev.params.naziv;
        pdao.dajPremaNazivu(naziv).then((proizvod) => {
            console.log(proizvod);
            odgovor.send(JSON.stringify(proizvod));
        });
    }
}

