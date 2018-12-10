import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-show-cart',
  templateUrl: 'show-cart.html',
})
export class ShowCartPage {
	getShopDetails: FirebaseListObservable < any[] > ;

	@ViewChild('slider') slider: Slides;
	getCartDetails: FirebaseListObservable < any[] > ;
	prevYounCount
	prevEldCount
	idAge
	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseServiceProvider, private alertCtrl: AlertController) {


		this.getCartDetails = this.firebaseService.getCartDetails();

		this.getShopDetails = this.firebaseService.getShopDetails();


		this.firebaseService.getElderCount((count) => {
			this.prevEldCount = count;
		});
		this.firebaseService.getYoungerCount((count) => {
			this.prevYounCount = count;
		});
	}

	selectedTab(num) {
		this.slider.slideTo(num);
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


}