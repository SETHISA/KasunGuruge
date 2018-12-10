import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AdminLoginPage} from '../admin-login/admin-login';
import {UserLoginPage} from '../user-login/user-login';


@IonicPage()
@Component({
  selector: 'page-main-login',
  templateUrl: 'main-login.html',
})
export class MainLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainLoginPage');
  }


  async adminLogin(){
    await this.navCtrl.push(AdminLoginPage);
  }
  async userLogin(){
    await this.navCtrl.push(UserLoginPage);
  }


}
