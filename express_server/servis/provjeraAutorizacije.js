const Konfiguracija = require("../konfiguracija.js");

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

class ProvjeraAutorizacije{

    provjeri(zahtjev){
        let korime = zahtjev.query.korime;
        let lozinka = zahtjev.query.lozinka;

        if(korime==undefined || lozinka==undefined || provjeriKorime(korime)==false || provjeriLozinka(lozinka)==false){
            return 400;
        }
        else if(konf.dajKonf()["rest.korime"] != korime || konf.dajKonf()["rest.lozinka"] != lozinka){
            return 401;
        }
        else return 200;
    }
}

function provjeriKorime(korime){
    const izraz = /^(?=(.*\d){2})(?=(.*[a-zA-Z]){2})[0-9a-zA-Z]{15,20}$/
    return izraz.test(korime);
}

function provjeriLozinka(lozinka){
    const izraz = /^(?=(.*[A-Za-z]){3})(?=(.*\d){3})(?=(.*[$&+,:;=?@#|'<>.^*()%!-]){3})[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-]{20,100}$/
    return izraz.test(lozinka);
}

module.exports = ProvjeraAutorizacije;
