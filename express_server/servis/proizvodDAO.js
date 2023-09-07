const Baza = require("./baza.js");

class ProizvodDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM proizvod;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (id) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM proizvod WHERE id=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (proizvod) {
		console.log(proizvod)
		let sql = `INSERT INTO proizvod (naziv,opis,slika) VALUES (?,?,?)`;
        let podaci = [proizvod.naziv, proizvod.opis, proizvod.slika];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}

	obrisi = async function (id) {
		let sql = "DELETE FROM proizvod WHERE id=?";
		await this.baza.izvrsiUpit(sql,[id]);
		return true;
	}

	dajPremaNazivu = async function (naziv) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM proizvod WHERE naziv=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [naziv]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}
}

module.exports = ProizvodDAO;
