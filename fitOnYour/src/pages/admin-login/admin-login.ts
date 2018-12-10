import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {AdminPage} from '../admin/admin';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';
import {MainLoginPage} from '../main-login/main-login';

@Component({
  selector: 'page-admin-login',
  templateUrl: 'admin-login.html',
})
export class AdminLoginPage {
  @ViewChild('username') uname;
  @ViewChild('password') pword;
  constructor(public navCtrl: NavController, public navParams: NavParams,private network: Network,private alertCtrl: AlertController) {
  }

  login(){
    if(this.uname.value=="admin" && this.pword.value=="admin"&&this.network.type!="none"){
    this.navCtrl.setRoot(AdminPage);
    }
    
    else{
     
      
       let alert = this.alertCtrl.create({
         title: 'Login Failed!',
         subTitle:'Entered data are invalid  or disconnect from server!',
         buttons: ['OK']
       });
       alert.present();
     
    }
  }
 
  back() {
    this.navCtrl.setRoot(MainLoginPage);
}
}
