const Baza = require("./baza.js");

class MeniDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM meni;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (id) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM meni WHERE id=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (meni) {
		console.log(meni)
		let sql = `INSERT INTO meni (naziv,opis,slika) VALUES (?,?,?)`;
        let podaci = [meni.naziv, meni.opis, meni.slika];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}

	obrisi = async function (id) {
		let sql = "DELETE FROM meni WHERE id=?";
		await this.baza.izvrsiUpit(sql,[id]);
		return true;
	}
}

module.exports = MeniDAO;
