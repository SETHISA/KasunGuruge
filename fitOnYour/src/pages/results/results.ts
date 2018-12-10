import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider} from '../../providers/firebase-service/firebase-service';
import { FirebaseListObservable } from 'angularfire2/database';
import moment from 'moment';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

	age: any
	name
	waist
	chest
	qrResults
	waistMatchPercentage
	chestMatchPercentage
	ovarrallMatchPercentage
	color
	imageNumber: Number
	imageUrl = "assets/imgs/shirt2.png"
	results
	yougersCount = 0
	oldersCount = 0
	idAge
	getCartDetails: FirebaseListObservable < any[] > ;
	value: FirebaseListObservable < any > ;
	qrwaist
	qrchest
	qrBrand
	prevEldCount
	prevYounCount
	date
	time
	when

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseServiceProvider, private alertCtrl: AlertController) {
		this.date = moment().format('YYYY-MM-DD');
		this.time = moment().format('HH:mm:ss');
		this.when = this.date + " " + this.time;

		this.getCartDetails = this.firebaseService.getCartDetails();

		this.firebaseService.getElderCount((count) => {
			this.prevEldCount = count;
		});
		this.firebaseService.getYoungerCount((count) => {
			this.prevYounCount = count;
		});


		this.name = this.navParams.get('name');
		this.age = this.navParams.get('age');
		this.waist = this.navParams.get('waist');
		this.qrResults = this.navParams.get('qrResults');
		this.chest = this.navParams.get('chest');
		this.waistMatchPercentage = Math.round(this.waistMatchPersentage());
		this.chestMatchPercentage = Math.round(this.chestMatchPersentage());
		this.ovarrallMatchPercentage = Math.round(this.OverallMatch());
		this.imageUrl = this.getImage();


	}


	addItemToCart() {
		if (Number(this.age) <= 20) {
			this.yougersCount = this.prevYounCount + 1;
			this.firebaseService.youngUpdate(this.yougersCount);
		} else {
			this.oldersCount = this.prevEldCount + 1;
			this.firebaseService.eldUpdate(this.oldersCount);
		}


		this.firebaseService.addItemToCart(this.name, this.age, this.waist, this.chest, this.when, this.imageUrl);


		alert("Sucessfully Added!!");

	}


	removeItem(id) {


		this.firebaseService.getAge(id, (age) => {
			this.idAge = age;
		});

		let alert = this.alertCtrl.create({
			title: 'Deleting Items',
			message: 'Do you want to delete this Item?',
			buttons: [{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Okay',
					handler: () => {


						if (Number(this.idAge) <= 20) {
							this.prevYounCount--;
							this.firebaseService.youngUpdate(this.prevYounCount);
						} else {
							this.prevEldCount--;
							this.firebaseService.eldUpdate(this.prevEldCount);
						}
						this.firebaseService.removeItemToCart(id);
					}
				}
			]
		});
		alert.present();


	}


	ionViewDidLoad() {
		console.log('ionViewDidLoad ResultsPage');
	}
	waistMatch() {
		var index1 = Number(this.qrResults.indexOf("= "));
		var index2 = Number(this.qrResults.indexOf("Waist(inches.)="));
		var index3 = Number(this.qrResults.indexOf("Chest(inches.)="));
		this.qrwaist = Number((this.qrResults.substr(index2, index3).trim()).match(/\d+/));
		this.qrBrand = (this.qrResults.substr(index1, index2).trim());
		return ((Number(this.waist)) / this.qrwaist) * 100;


	}
	chestMatch() {
		var index1 = Number(this.qrResults.indexOf("Chest(inches.)="));
		var index2 = Number(this.qrResults.indexOf("imageUrl="));
		this.qrchest = Number((this.qrResults.substr(index1, index2).trim()).match(/\d+/));
		return ((Number(this.chest)) / this.qrchest) * 100;


	}

	waistMatchPersentage() {

		var index2 = Number(this.qrResults.indexOf("Waist(inches.)="));
		var index3 = Number(this.qrResults.indexOf("Chest(inches.)="));
		this.qrwaist = Number((this.qrResults.substr(index2, index3).trim()).match(/\d+/));

		if (((Number(this.waist)) - (Number(this.qrwaist)) <= 1)) {
			return ((Number(this.waist)) / this.qrwaist) * 100;
		} else {
			return ((this.qrwaist) / (Number(this.waist))) * 100;
		}


	}
	chestMatchPersentage() {

		var index1 = Number(this.qrResults.indexOf("Chest(inches.)="));
		var index2 = Number(this.qrResults.indexOf("imageUrl="));
		this.qrchest = Number((this.qrResults.substr(index1, index2).trim()).match(/\d+/));

		if (((Number(this.chest)) - this.qrchest) <= 1) {
			return ((Number(this.chest)) / this.qrchest) * 100;
		} else {
			return ((this.qrchest) / (Number(this.chest))) * 100;
		}

	}


	OverallMatch() {

		var ovrP = ((Number(Math.round(this.waistMatch()) * (1 / 2)) + Number(Math.round(this.chestMatch()) * (4 / 3))) / 2);

		if ((89 < ovrP) && (ovrP <= 130)) {
			this.color = 'Blue';
			this.results = "PERFECT";
		}
		if (130 < ovrP) {
			this.color = 'red';			//range
			this.results = "TIGHT(please try with large sizes)";
		}

		if ((ovrP > 0) && (ovrP < 90)) {
			this.color = '#99ffff';
			this.results = "LOOSE(please try with small sizes)";
		}


		return ovrP;
	}
	getImage() {

		var re = /\d+/;
		var index1 = Number(this.qrResults.indexOf("imageUrl="));
		var index2 = Number(this.qrResults.indexOf("k"));
		var imageNumber = Number((this.qrResults.substr(index1, index2).trim()).match(/\d+/));
		if (imageNumber === 1) {
			var imageUrl1 = "1"
			var imageUrlnew1 = this.imageUrl.replace(re, imageUrl1);   //used regular expression
			return imageUrlnew1;
		}
		if (imageNumber === 2) {
			var imageUrl2 = "2"
			var imageUrlnew2 = this.imageUrl.replace(re, imageUrl2);
			return imageUrlnew2;
		}
		if (imageNumber === 3) {
			var imageUrl3 = "3"
			var imageUrlnew3 = this.imageUrl.replace(re, imageUrl3);
			return imageUrlnew3;
		}

	}


}