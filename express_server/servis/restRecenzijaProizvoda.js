const RecenzijaProizvodaDAO = require("./recenzijaProizvodaDAO.js");
const ProvjeraAutorizacije = require("./provjeraAutorizacije.js");

exports.getRecenzijeProizvoda = function (zahtjev, odgovor) {
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

        let rdao = new RecenzijaProizvodaDAO();
        rdao.dajSve(odobreno).then((recenzije_proizvoda) => {
            console.log(recenzije_proizvoda);
            odgovor.send(JSON.stringify(recenzije_proizvoda));
        });
    }
}

exports.getRecenzijeOdabranogProizvoda = function (zahtjev, odgovor) {
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

        let rdao = new RecenzijaProizvodaDAO();
        rdao.dajSveZaOdabraniProizvod(id).then((recenzije_proizvoda) => {
            console.log(recenzije_proizvoda);
            odgovor.send(JSON.stringify(recenzije_proizvoda));
        });
    }
}


exports.postRecenzijeProizvoda = function (zahtjev, odgovor) {
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
        let rdao = new RecenzijaProizvodaDAO();
        rdao.dodaj(podaci).then((poruka) => {
            odgovor.send(JSON.stringify(poruka));
        });
    }
}

exports.getRecenzijaProizvoda = function (zahtjev, odgovor) {
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
        let rdao = new RecenzijaProizvodaDAO();
        let id = zahtjev.params.id;
        rdao.daj(id).then((recenzija_proizvoda) => {
            console.log(recenzija_proizvoda);
            odgovor.send(JSON.stringify(recenzija_proizvoda));
        });
    }
}

exports.deleteRecenzijaProizvoda = function (zahtjev, odgovor) {
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
        let rdao = new RecenzijaProizvodaDAO();
        rdao.obrisi(id).then((poruka) => {
            odgovor.send(JSON.stringify(poruka));
        });
    }
}

exports.putOdobriRecenzijuProizvoda = function (zahtjev, odgovor) {
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
        let rdao = new RecenzijaProizvodaDAO();

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


