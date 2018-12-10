import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ExampletestPage } from './../exampletest/exampletest';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-input-data',
  templateUrl: 'input-data.html',
})
export class InputDataPage {
	developer = {};
	developers = [];
	result: any;
	mute: boolean;
	customerDetails: FirebaseListObservable < any[] > ;

	name: string;
	age;
	waist;
	chest;


	constructor(public navCtrl: NavController, public firebaseService: FirebaseServiceProvider, private alertCtrl: AlertController) {

		this.customerDetails = this.firebaseService.getCustomerDetails();

		``
		console.log(this.customerDetails);
	}


	removeUser(id) {

		console.log(id);
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
						this.firebaseService.removeCustomerDetails(id);
					}
				}
			]
		});
		alert.present();


	}

	addUser() {
		this.firebaseService.addCustomerDetails(this.name, this.age, this.waist, this.chest);

	}


	showExample(name, waist, chest, age) {

		this.navCtrl.push(ExampletestPage, {

			'name': name,
			'waist': waist,
			'qrchest': 70,
			'qrwaist': 60,
			'chest': chest
		});

	}

	results(name, age, waist, chest) {

		if (isNaN(waist) == true || isNaN(chest) == true ||
			waist == null || chest == null ||
			(name).trim() == "" || name == " " ||
			waist <= 50 || waist >= 120 || chest <= 50 ||
			chest >= 120) {


			return false;
		} else return true;

	}


}
