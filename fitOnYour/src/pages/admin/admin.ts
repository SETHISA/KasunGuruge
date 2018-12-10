import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { MainLoginPage } from '../main-login/main-login';
import { AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

	@ViewChild('doughnutCanvas') doughnutCanvas;
	@ViewChild('slider') slider: Slides;
	getCartDetails: FirebaseListObservable < any[] > ;
	getShopDetails: FirebaseListObservable < any[] > ;
	youngersCount
	eldersCount
	youngersCount1
	eldersCount1
	shopDetails
	e
	doughnutChart: any;
	date
	time

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseServiceProvider, private alertCtrl: AlertController) {
		this.getCartDetails = this.firebaseService.getCartDetails();
		this.getShopDetails = this.firebaseService.getShopDetails();
		this.date = moment().format('YYYY-MM-DD');
		this.time = moment().format('HH:mm:ss');
		console.log(this.date);

		this.firebaseService.getElderCount((count) => {
			this.eldersCount = count;
		});
		this.firebaseService.getYoungerCount((count) => {
			this.youngersCount = count;
		});

	}


	selectedTab(num) {
		this.slider.slideTo(num);
	}


	showCharts(eldersCount, youngersCount) {
		console.log(this.eldersCount);

		this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

			type: 'doughnut',
			data: {
				labels: ["Elders", "Youngers"],
				datasets: [{

					label: '# of Votes',
					data: [eldersCount, youngersCount],
					backgroundColor: [
						'rgba(255, 99, 132, 2)',
						'rgba(54, 162, 235, 2)'

					],
					hoverBackgroundColor: [
						"#FF6384",
						"#36A2EB"
					]
				}]
			}

		});


	}


	async logOut() {

		await this.navCtrl.push(MainLoginPage);
	}


	updateShopDetails() {
		let alert = this.alertCtrl.create({
			title: 'Updating Items',
			message: 'Do you want to update this Details?',
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
						this.firebaseService.updateShopDetails(this.shopDetails);
					}
				}
			]
		});
		alert.present();


	}


	removeShopDetails(id) {
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
						this.firebaseService.removeShopDetails(id);
					}
				}
			]
		});
		alert.present();


	}
}