const konst = require("../konstante.js");
const express = require(konst.dirModula + 'express');
const Konfiguracija = require("../konfiguracija");
const restKorisnici = require("./restKorisnik.js");
const restProizvodi = require("./restProizvod.js");
const restMeniji = require("./restMeni.js");
const restRecenzijeProizvoda = require("./restRecenzijaProizvoda.js");
const restRecenzijeMenija = require("./restRecenzijaMenija.js");
const restNutricionistickeVrijednosti = require("./restNutricionistickeVrijednosti.js");
const path = require("path");

const htmlParser = require("./htmlParser.js");
const nutritionApi = require("./nutritionApi.js");
const awsStorage = require("./awsStorage.js");

const cors = require(konst.dirModula+'cors')

const sesija = require('express-session');
const kolacici = require('cookie-parser');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const server = express();

server.use(cors());

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(() => {
    
    let konfa = konf.dajKonf();

    provjera = true;

    if(konfa["rest.korime"]==undefined){
        console.log("U konfiguracijskoj datoteci nedostaje: rest.korime");
        provjera = false;
    }
    if(konfa["rest.lozinka"]==undefined){
        console.log("U konfiguracijskoj datoteci nedostaje: rest.lozinka");
        provjera = false;
    }
    if(konfa["rest.port"]==undefined){
        console.log("U konfiguracijskoj datoteci nedostaje: rest.port");
        provjera = false;
    }

    let izrazKorime = new RegExp(/^(?=(.*\d){2})(?=(.*[a-zA-Z]){2})[0-9a-zA-Z]{15,20}$/);
    if(!izrazKorime.test(konfa["rest.korime"])) provjera = false;

    let izrazLozinka = new RegExp(/^(?=(.*[A-Za-z]){3})(?=(.*\d){3})(?=(.*[$&+,:;=?@#|'<>.^*()%!-]){3})[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-]{20,100}$/)
    if(!izrazLozinka.test(konfa["rest.lozinka"])) provjera = false;

    if(!provjera) process.exit();
    pokreniServer();

}).catch((greska) => {
    if (process.argv.length == 2)
        console.error("Potrebno je unijeti naziv datoteke!");
    else
        console.error("Naziv datoteke nije dobar: " + greska.path);
    process.exit()
});

function pokreniServer() {
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());

    server.use(kolacici())
    server.use(sesija({
        secret: konst.tajniKljucSesija, 
        saveUninitialized: true,
        cookie: {  maxAge: 1000 * 60 * 60 * 3 },
        resave: false
    }));

    const podaci = konf.dajKonf();
    const port = podaci["rest.port"];

    pripremiSvePutanje();

    server.use(express.static(path.join(__dirname, "../aplikacija/angular")));

    server.all("/*", function(req, res, next) {
        res.sendFile("index.html", { root: path.join(__dirname, "../aplikacija/angular") });
      });

    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        let poruka = { greska: "nema resursa!" }
        odgovor.json(poruka);
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}

function pripremiSvePutanje(){
    pripremiPutanjeKorisnik();
    pripremiPutanjeProizvod();
    pripremiPutanjeMeni();
    pripremiPutanjeRecenzijaProizvoda();
    pripremiPutanjeRecenzijaMenija();
    pripremiPutanjeDatoteka();
    pripremiPutanjeNutrijenti();

    server.get("/api/htmlParse",htmlParser.getHTML);
}

function pripremiPutanjeDatoteka(){
    server.get("/api/datoteka/:fileName",awsStorage.getFile);

    server.post('/api/datoteka', awsStorage.createFile);
    server.post('/api/datotekaUpload', upload.single('file'), awsStorage.uploadFile);  //nema na django serveru
}

function pripremiPutanjeNutrijenti(){
    server.get("/api/nutrition/items",nutritionApi.getItems);

    server.get("/api/nutricionistickeVrijednosti/:id",restNutricionistickeVrijednosti.getNutricionistickeVrijednosti);
    server.post("/api/nutricionistickeVrijednosti",restNutricionistickeVrijednosti.postNutricionistickeVrijednosti);
}

function pripremiPutanjeKorisnik(){
    server.get("/api/korisnici",restKorisnici.getKorisnici); 
    server.post("/api/korisnici",restKorisnici.postKorisnici); 

    server.get("/api/korisnici/:korime",restKorisnici.getKorisnik); 
    server.delete("/api/korisnici/:id",restKorisnici.deleteKorisnik);

    server.post("/api/korisnici/:korime/prijava",restKorisnici.postKorisnikPrijava); 

    server.put("/api/korisnici/:id/aktivacija",restKorisnici.putKorisnikAktivacija); 
}

function pripremiPutanjeProizvod(){
    server.get("/api/proizvodi",restProizvodi.getProizvodi);
    server.post("/api/proizvodi",restProizvodi.postProizvodi);

    server.get("/api/proizvodi/:id",restProizvodi.getProizvod)

    server.get("/api/dajProizvodPremaNazivu/:naziv",restProizvodi.getProizvodPremaNazivu);
}

function pripremiPutanjeMeni(){
    server.get("/api/meniji",restMeniji.getMeniji);
    server.post("/api/meniji",restMeniji.postMeniji);

    server.get("/api/meniji/:id",restMeniji.getMeni);
}

function pripremiPutanjeRecenzijaProizvoda(){
    server.get("/api/recenzijeProizvoda",restRecenzijeProizvoda.getRecenzijeProizvoda);
    server.post("/api/recenzijeProizvoda",restRecenzijeProizvoda.postRecenzijeProizvoda);

    server.get("/api/recenzijeProizvoda/:id",restRecenzijeProizvoda.getRecenzijaProizvoda);
    server.delete("/api/recenzijeProizvoda/:id",restRecenzijeProizvoda.deleteRecenzijaProizvoda);

    server.get("/api/recenzijeOdabranogProizvoda/:id",restRecenzijeProizvoda.getRecenzijeOdabranogProizvoda);

    server.put("/api/recenzijeProizvoda/:id/odobri",restRecenzijeProizvoda.putOdobriRecenzijuProizvoda);
}

function pripremiPutanjeRecenzijaMenija(){
    server.get("/api/recenzijeMenija",restRecenzijeMenija.getRecenzijeMenija);
    server.post("/api/recenzijeMenija",restRecenzijeMenija.postRecenzijeMenija);

    server.get("/api/recenzijeMenija/:id",restRecenzijeMenija.getRecenzijaMenija);
    server.delete("/api/recenzijeMenija/:id",restRecenzijeMenija.deleteRecenzijaMenija);

    server.put("/api/recenzijeMenija/:id/odobri",restRecenzijeMenija.putOdobriRecenzijuMenija);

    server.get("/api/recenzijeOdabranogMenija/:id",restRecenzijeMenija.getRecenzijeOdabranogMenija);
}