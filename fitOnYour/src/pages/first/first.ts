import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { InputDataPage } from '../input-data/input-data';
import { TryResultPage } from '../try-result/try-result';
import {ShowCartPage} from '../show-cart/show-cart';
import {MainLoginPage} from '../main-login/main-login';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class FirstPage {
	res;

	connected: Subscription;
	disconnected: Subscription;

	products: any[]

	options: BarcodeScannerOptions;

	results: {};
	constructor(private barcode: BarcodeScanner, private toast: ToastController, private network: Network, public navCtrl: NavController) {

	}
	async scanBarcode() {
		this.results = await this.barcode.scan();
		console.log(this.results);
	}


	async nextPage() {

		await this.navCtrl.push(InputDataPage);

	}

	async showCart() {
		await this.navCtrl.push(ShowCartPage);
	}


	tryQR(results1) {

		this.navCtrl.push(TryResultPage, {

			'value': results1
		});
	}


	displayNetworkUpdate(connectionState: string) {
		let networkType = this.network.type;
		this.toast.create({
			message: `You are now ${connectionState} in ${networkType}`,
			duration: 3000
		}).present();
	}

	ionViewDidEnter() {
		this.connected = this.network.onConnect().subscribe(data => {
			console.log(data)
			this.displayNetworkUpdate(data.type);
		}, error => console.error(error));

		this.disconnected = this.network.onDisconnect().subscribe(data => {
			console.log(data)
			this.displayNetworkUpdate(data.type);
		}, error => console.error(error));
	}

	ionViewWillLeave() {
		this.connected.unsubscribe();
		this.disconnected.unsubscribe();
	}


	async logOut() {

		await this.navCtrl.push(MainLoginPage);
	}
}