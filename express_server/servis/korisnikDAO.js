const Baza = require("./baza.js");

class KorisnikDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik WHERE aktiviran = 0;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik WHERE korime=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (korisnik) {
		console.log(korisnik)
		let sql = `INSERT INTO korisnik (ime,prezime,lozinka,email,korime,aktiviran,uloga_id) VALUES (?,?,?,?,?,?,?)`;
        let podaci = [korisnik.ime,korisnik.prezime,
                      korisnik.lozinka,korisnik.email,korisnik.korime,0,2];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}

	obrisi = async function (id) {
		let sql = "DELETE FROM korisnik WHERE id=?";
		await this.baza.izvrsiUpit(sql,[id]);
		return true;
	}

	azuriraj = async function (korime, korisnik) {
		let sql = `UPDATE korisnik SET ime=?, prezime=?, lozinka=? WHERE korime=?`;
        let podaci = [korisnik.ime,korisnik.prezime,
                      korisnik.lozinka,korime];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}

	aktiviraj = async function(id, korisnik) {
		let sql = `UPDATE korisnik SET aktiviran=? WHERE id=?`;
		let podaci = [1,id];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
}

module.exports = KorisnikDAO;
