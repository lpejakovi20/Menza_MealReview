const MeniDAO = require("./meniDAO.js");
const ProvjeraAutorizacije = require("./provjeraAutorizacije.js");

exports.getMeniji = function (zahtjev, odgovor) {
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
        let mdao = new MeniDAO();
        mdao.dajSve().then((meniji) => {
            console.log(meniji);
            odgovor.send(JSON.stringify(meniji));
        });
    }
}

exports.postMeniji = function (zahtjev, odgovor) {
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
        let mdao = new MeniDAO();
        mdao.dodaj(podaci).then((poruka) => {
            odgovor.send(JSON.stringify(poruka));
        });
    }
}

exports.getMeni = function (zahtjev, odgovor) {
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
        let mdao = new MeniDAO();
        let id = zahtjev.params.id;
        mdao.daj(id).then((meni) => {
            console.log(meni);
            odgovor.send(JSON.stringify(meni));
        });
    }
}



