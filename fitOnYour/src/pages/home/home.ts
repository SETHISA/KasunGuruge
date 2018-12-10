import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {FirstPage} from '../first/first';
import {AdminPage} from '../admin/admin';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('username') uname;
  @ViewChild('password') pword;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private network: Network,private alertCtrl: AlertController) {
  }

 login(){
   if(this.uname.value=="admin" && this.pword.value=="admin"&&this.network.type!="none"){
   this.navCtrl.setRoot(AdminPage);
   }
   else if(this.uname.value=="a" && this.pword.value=="a" &&this.network.type!="none"){
    this.navCtrl.setRoot(FirstPage);
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
}
