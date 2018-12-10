import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResultsPage } from '../results/results';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { FirebaseListObservable } from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-try-result',
  templateUrl: 'try-result.html',


})
export class TryResultPage {
	public a: string = null;
	developers = [];
	qrResults
	QRavailableCheck: number

	customerDetails: FirebaseListObservable < any[] > ;

	constructor(public navCtrl: NavController, private navparam: NavParams, public firebaseService: FirebaseServiceProvider) {

		this.customerDetails = this.firebaseService.getCustomerDetails();


		this.qrResults = this.navparam.get('value');
		this.QRavailableCheck = this.qrAvailable();
	}


	showResults(name, age, waist, qrResults, chest) {

		this.navCtrl.push(ResultsPage, {

			'name': name,
			'age': age,
			'waist': waist,
			'qrResults': qrResults,
			'chest': chest
		});

	}


	qrAvailable() {
		var index1 = Number(this.qrResults.indexOf("Waist(inches.)="));
		return index1;
	}

}