import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ExampletestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exampletest',
  templateUrl: 'exampletest.html',
})
export class ExampletestPage {
	name
	waist
	chest
	qrwaist
	qrchest
	qrResults
	waistMatchPersentage
	chestMatchPersentage
	ovarrallMatchPersentage
	color
	imageNumber: Number
	imageUrl = "assets/imgs/shirt2.png"
	results
	qrImage
	resultPersentage1
	resultPersentage2

	constructor(public navCtrl: NavController, public navParams: NavParams) {

		this.name = this.navParams.get('name');
		this.chest = this.navParams.get('chest');
		this.waist = this.navParams.get('waist');
		this.qrchest = this.navParams.get('qrchest');
		this.qrwaist = this.navParams.get('qrwaist');
		this.qrImage = this.imageUrl;
		this.waistMatchPersentage = Math.round(this.WMatchPersentage());
		this.chestMatchPersentage = Math.round(this.CMatchPersentage());
		this.ovarrallMatchPersentage = Math.round(this.OverallMatch());

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ExampletestPage');
	}


	waistMatch() {

		this.resultPersentage1 = ((Number(this.waist)) / this.qrwaist) * 100;

		return this.resultPersentage1;
	}
	chestMatch() {

		this.resultPersentage2 = ((Number(this.chest)) / this.qrchest) * 100;

		return this.resultPersentage2;
	}


	WMatchPersentage() {
		if ((this.waist - this.qrwaist) <= 1) {
			this.resultPersentage1 = ((Number(this.waist)) / this.qrwaist) * 100; // Identical sizes(BMI = 18.8, WHR = 0.73, WCR = 0.69)
		} else {
			this.resultPersentage1 = ((Number(this.qrchest)) / this.chest) * 100;
		}
		return this.resultPersentage1;

	}
	CMatchPersentage() {
		if ((this.chest - this.qrchest) <= 1) {
			this.resultPersentage2 = ((Number(this.chest)) / this.qrchest) * 100;
		} else {
			this.resultPersentage2 = ((Number(this.qrchest)) / this.chest) * 100;
		}
		return this.resultPersentage2;
	}


	OverallMatch() {

		var ovrP = ((Number(Math.round(this.waistMatch()) * (1 / 2)) + Number(Math.round(this.chestMatch()) * (3 / 4))) / 2);

		if ((89 < ovrP) && (ovrP <= 130)) {
			this.color = 'Blue';
			this.results = "PERFECT";
		}
		if (130 < ovrP) {
			this.color = 'red';
			this.results = "TIGHT";
		}

		if ((ovrP > 0) && (ovrP < 90)) {
			this.color = '#99ffff';
			this.results = "LOOSE";
		}


		return ovrP;
	}

}