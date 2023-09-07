const KorisnikDAO = require("./korisnikDAO.js");
const ProvjeraAutorizacije = require("./provjeraAutorizacije.js");
const kodovi = require("./kodovi.js");

exports.getKorisnici = function (zahtjev, odgovor) {
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
        let kdao = new KorisnikDAO();
        kdao.dajSve().then((korisnici) => {
            console.log(korisnici);
            odgovor.send(JSON.stringify(korisnici));
        });
    }
}

exports.postKorisnici = function (zahtjev, odgovor) {
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
        var lozinka = zahtjev.body.lozinka;
        var korime = zahtjev.body.korime;

        lozinkaHash = kodovi.kreirajSHA256(lozinka, korime);

        let podaci = zahtjev.body;
        podaci.lozinka = lozinkaHash;

        kdao = new KorisnikDAO();
        kdao.dodaj(podaci).then((poruka) => {
            odgovor.send(JSON.stringify(poruka));
        });
    }
}

exports.getKorisnik = function (zahtjev, odgovor) {
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
        let kdao = new KorisnikDAO();
        let korime = zahtjev.params.korime;
        kdao.daj(korime).then((korisnik) => {
            console.log(korisnik);
            odgovor.send(JSON.stringify(korisnik));
        });
    }
}

exports.postKorisnikPrijava = function (zahtjev, odgovor) {
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
        var lozinka = zahtjev.body.lozinka;
        var korime = zahtjev.params.korime;

        lozinkaHash = kodovi.kreirajSHA256(lozinka, korime);

        let kdao = new KorisnikDAO();
        let korim = zahtjev.params.korime;
        kdao.daj(korim).then((korisnik) => {
            console.log(korisnik)
            console.log(zahtjev.body)
            if(korisnik!=null && korisnik.lozinka==lozinkaHash){
                odgovor.send(JSON.stringify(korisnik));
            }
            else{ 
                odgovor.status(401)
                odgovor.send(JSON.stringify({greska: "Krivi podaci!"}))
            }
        });
    }
}

exports.deleteKorisnik = function (zahtjev, odgovor) {
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
        let kdao = new KorisnikDAO();
        kdao.obrisi(id).then((poruka) => {
            odgovor.send(JSON.stringify(poruka));
        });
    }
}

exports.putKorisnikAktivacija = function (zahtjev, odgovor) {
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
        let podaci = zahtjev.body;
        let kdao = new KorisnikDAO();

        kdao.aktiviraj(id, podaci).then((uspjeh) => {
            if(uspjeh) odgovor.send(JSON.stringify(uspjeh));
            else {
                odgovor.status(401);
                let poruka = { greska:"Krivi podaci!" }
                odgovor.send(JSON.stringify(poruka));
            }
        });
    }
}

exports.postPrijava = function (zahtjev, odgovor) {

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
        var lozinka = zahtjev.body.lozinka;
        var korime = zahtjev.params.korime;

        lozinkaHash = kodovi.kreirajSHA256(lozinka, korime);

        let kdao = new KorisnikDAO();
        let korim = zahtjev.params.korime;
        kdao.daj(korim).then((korisnik) => {
            if(korisnik!=null && korisnik.lozinka==lozinkaHash)
                odgovor.send(JSON.stringify(korisnik));
            else{ 
                odgovor.status(401)
                odgovor.send(JSON.stringify({greska: "Krivi podaci!"}))
            }
        });
    }
}

