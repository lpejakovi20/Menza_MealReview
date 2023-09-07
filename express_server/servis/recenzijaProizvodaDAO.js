const Baza = require("./baza.js");

class RecenzijaProizvodaDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function (odobreno) {
		this.baza.spojiSeNaBazu();
		//let sql = "SELECT * FROM recenzija_proizvoda WHERE odobreno=?;"
		let sql = "SELECT rp.*, u.korime FROM recenzija_proizvoda rp INNER JOIN korisnik u ON rp.korisnik_id = u.id WHERE rp.odobreno=?;";
		var podaci = await this.baza.izvrsiUpit(sql, [odobreno]);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (id) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM recenzija_proizvoda WHERE id=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (recenzija_proizvoda) {
		console.log(recenzija_proizvoda)
		let sql = `INSERT INTO recenzija_proizvoda (ocjena,sadrzaj,slika,video,odobreno,datum_vrijeme,proizvod_id,korisnik_id) VALUES (?,?,?,?,?,?,?,?)`;
        let podaci = [recenzija_proizvoda.ocjena,recenzija_proizvoda.sadrzaj,recenzija_proizvoda.slika,recenzija_proizvoda.video,
			0,new Date(),recenzija_proizvoda.proizvod_id,recenzija_proizvoda.korisnik_id];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}

	obrisi = async function (id) {
		let sql = "DELETE FROM recenzija_proizvoda WHERE id=?";
		await this.baza.izvrsiUpit(sql,[id]);
		return true;
	}

	odobri = async function (id) {
		let sql = `UPDATE recenzija_proizvoda SET odobreno=? WHERE id=?`;
		let podaci = [1,id];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
	/*
	dajSveZaOdabraniProizvod = async function (id) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM recenzija_proizvoda WHERE proizvod_id=? AND odobreno=1;"
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		this.baza.zatvoriVezu();
		return podaci;
	}*/
	
	dajSveZaOdabraniProizvod = async function (id) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT rp.*, u.korime FROM recenzija_proizvoda rp INNER JOIN korisnik u ON rp.korisnik_id = u.id WHERE rp.proizvod_id=? AND rp.odobreno=1;";
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		this.baza.zatvoriVezu();
		return podaci;
	}
	

}

module.exports = RecenzijaProizvodaDAO;
