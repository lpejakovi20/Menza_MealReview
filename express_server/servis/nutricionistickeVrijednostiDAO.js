const Baza = require("./baza.js");

class NutricionistickeVrijednostiDAO {

	constructor() {
		this.baza = new Baza();
	}

	daj = async function (id) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM nutricionisticke_vrijednosti WHERE proizvod_id=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (n_vrijednost) {
		console.log(n_vrijednost)
		let sql = `INSERT INTO nutricionisticke_vrijednosti (kalorije,masti,zasicene_masti,ugljikohidrati,vlakna,seceri,
            protein,kolesterol,natrij,kalcij,magnezij,zeljezo,kalij,cink,fosfor,vitamin_A,vitamin_C,vitamin_B1,vitamin_B2,
            vitamin_B3,vitamin_B6,vitamin_B9,vitamin_B12,vitamin_D,vitamin_E,vitamin_K,voda,proizvod_id) VALUES (?,?,?,?,?,
                ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        let podaci = [n_vrijednost.kalorije,n_vrijednost.masti,n_vrijednost.zasicene_masti,n_vrijednost.ugljikohidrati,n_vrijednost.vlakna,
            n_vrijednost.seceri,n_vrijednost.protein,n_vrijednost.kolesterol,n_vrijednost.natrij,n_vrijednost.kalcij,n_vrijednost.magnezij,
            n_vrijednost.zeljezo,n_vrijednost.kalij,n_vrijednost.cink,n_vrijednost.fosfor,n_vrijednost.vitamin_A,n_vrijednost.vitamin_C,
            n_vrijednost.vitamin_B1,n_vrijednost.vitamin_B2, n_vrijednost.vitamin_B3,n_vrijednost.vitamin_B6,n_vrijednost.vitamin_B9,n_vrijednost.vitamin_B12,n_vrijednost.vitamin_D,
            n_vrijednost.vitamin_E,n_vrijednost.vitamin_K,n_vrijednost.voda,n_vrijednost.proizvod_id];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
}

module.exports = NutricionistickeVrijednostiDAO;
