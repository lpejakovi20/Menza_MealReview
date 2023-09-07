const RecenzijaMenijaDAO = require("./recenzijaMenijaDAO.js");
const ProvjeraAutorizacije = require("./provjeraAutorizacije.js");

exports.getRecenzijeMenija = function (zahtjev, odgovor) {
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
        let odobreno = zahtjev.query.odobreno;

        let rdao = new RecenzijaMenijaDAO();
        rdao.dajSve(odobreno).then((recenzije_menija) => {
            console.log(recenzije_menija);
            odgovor.send(JSON.stringify(recenzije_menija));
        });
    }
}


exports.postRecenzijeMenija = function (zahtjev, odgovor) {
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
        let rdao = new RecenzijaMenijaDAO();
        rdao.dodaj(podaci).then((poruka) => {
            odgovor.send(JSON.stringify(poruka));
        });
    }
}

exports.getRecenzijaMenija = function (zahtjev, odgovor) {
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
        let rdao = new RecenzijaMenijaDAO();
        let id = zahtjev.params.id;
        rdao.daj(id).then((recenzija_menija) => {
            console.log(recenzija_menija);
            odgovor.send(JSON.stringify(recenzija_menija));
        });
    }
}

exports.deleteRecenzijaMenija = function (zahtjev, odgovor) {
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
        let id = zahtjev.params.id;
        let rdao = new RecenzijaMenijaDAO();
        rdao.obrisi(id).then((poruka) => {
            odgovor.send(JSON.stringify(poruka));
        });
    }
}

exports.putOdobriRecenzijuMenija = function (zahtjev, odgovor) {
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
        let id = zahtjev.params.id;
        let rdao = new RecenzijaMenijaDAO();

        rdao.odobri(id).then((uspjeh) => {
            if(uspjeh) odgovor.send(JSON.stringify(uspjeh));
            else {
                odgovor.status(401);
                let poruka = { greska:"Krivi podaci!" }
                odgovor.send(poruka);
            }
        });
    }
}

exports.getRecenzijeOdabranogMenija = function (zahtjev, odgovor) {
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
        let id = zahtjev.params.id;

        let rdao = new RecenzijaMenijaDAO();
        rdao.dajSveZaOdabraniMeni(id).then((recenzije_menija) => {
            console.log(recenzije_menija);
            odgovor.send(JSON.stringify(recenzije_menija));
        });
    }
}


