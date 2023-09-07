const Baza = require("./baza.js");

class RecenzijaMenijaDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function (odobreno) {
		this.baza.spojiSeNaBazu();
		//let sql = "SELECT * FROM recenzija_menija WHERE odobreno=?;"
		let sql = "SELECT rm.*, u.korime FROM recenzija_menija rm INNER JOIN korisnik u ON rm.korisnik_id = u.id WHERE rm.odobreno=?;";
		var podaci = await this.baza.izvrsiUpit(sql, [odobreno]);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (id) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM recenzija_menija WHERE id=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (recenzija_menija) {
		console.log(recenzija_menija)
		let sql = `INSERT INTO recenzija_menija (ocjena,sadrzaj,slika,video,odobreno,datum_vrijeme,meni_id,korisnik_id) VALUES (?,?,?,?,?,?,?,?)`;
        let podaci = [recenzija_menija.ocjena,recenzija_menija.sadrzaj,recenzija_menija.slika,recenzija_menija.video,0,new Date(),
			recenzija_menija.meni_id,recenzija_menija.korisnik_id];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}

	obrisi = async function (id) {
		let sql = "DELETE FROM recenzija_menija WHERE id=?";
		await this.baza.izvrsiUpit(sql,[id]);
		return true;
	}

	odobri = async function (id) {
		let sql = `UPDATE recenzija_menija SET odobreno=? WHERE id=?`;
		let podaci = [1,id];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}

	dajSveZaOdabraniMeni = async function (id) {
		this.baza.spojiSeNaBazu();
		//let sql = "SELECT * FROM recenzija_menija WHERE meni_id=? AND odobreno=1;"
		let sql = "SELECT rp.*, u.korime FROM recenzija_menija rp INNER JOIN korisnik u ON rp.korisnik_id = u.id WHERE rp.meni_id=? AND rp.odobreno=1;";
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		this.baza.zatvoriVezu();
		return podaci;
	}
}

module.exports = RecenzijaMenijaDAO;
