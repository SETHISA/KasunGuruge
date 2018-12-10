import { FirstPage } from '../first/first';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AuthService } from '../../services/auth.service';
import {MainLoginPage} from '../main-login/main-login';
import {TryResultPage} from '../try-result/try-result';
import{ResultsPage} from '../results/results';
// import {Facebook} from '@ionic-native/facebook';
 import firebase from 'firebase';

import {GooglePlus} from '@ionic-native/google-plus';
import{AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'page-user-login',
    templateUrl: 'user-login.html',
})
export class UserLoginPage {
    user: Observable < firebase.User >
        loginForm: FormGroup;
    loginError: string;

    constructor(
        private navCtrl: NavController,
        private auth: AuthService,
        private gplus: GooglePlus,
        private afauth: AngularFireAuth,
        fb: FormBuilder,
         private platform:Platform
    ) {
        this.loginForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });

        this.user = this.afauth.authState;
    }

    login() {
        let data = this.loginForm.value;

        if (!data.email) {
            return;
        }

        let credentials = {
            email: data.email,
            password: data.password
        };
        this.auth.signInWithEmail(credentials)
            .then(
                () => this.navCtrl.setRoot(FirstPage),
                error => this.loginError = error.message
            );
    }
    signup() {
        this.navCtrl.push(SignupPage);
    }

    // loginWithGoogle(): Promise < any > {


        // return new Promise((resolve, reject) => {
        //     this.gplus.login({
        //         'webClientId': '906034179889-1q0lnbn8rrts8tgee3ni663l8dqt861h.apps.googleusercontent.com',
        //         'offline': true
        //     }).then(res => {
        //         const googleCredential = firebase.auth.GoogleAuthProvider
        //             .credential(res.idToken);

        //         firebase.auth().signInWithCredential(googleCredential)
        //             .then(response => {
        //                 console.log("Firebase success: " + JSON.stringify(response));
        //                 resolve(response)
        //             });
        //     }, err => {
        //         console.error("Error: ", err)
        //         reject(err);
        //     });
        // });

		loginWithGoogle(){


        if(this.platform.is('cordova')){
        	this.gplus.login({
        		'webclientId':'906034179889-1q0lnbn8rrts8tgee3ni663l8dqt861h.apps.googleusercontent.com',
        	 'offline': true
        	}).then(res=>{
        		firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        		.then(suc=>{
        			alert("Login suc");
        			this.navCtrl.setRoot(FirstPage);
        		}).catch(ns=>{
        			alert("not suc")
        		})
        	})

        }
        else{
        	this.auth.signInWithGoogle()
        		.then(
        			() => this.navCtrl.setRoot(FirstPage),
        			error => console.log(error.message)
        		);

        }




        // this.auth.signInWithGoogle()
        // 	.then(
        // 		() => this.navCtrl.setRoot(FirstPage),
        // 		error => console.log(error.message)
        // 	);


        // 		if(this.platform.is('cordova')){
        // 			this.nativeGoogleLogin();

        // 		}
        // 		else{
        // 			this.webGoogleLogin();

        // 		}
        // 	}

        // async nativeGoogleLogin():Promise<void>{
        // try{
        // 	const gplusUser=await this.gplus.login({
        // 		'webclientId':'906034179889-1q0lnbn8rrts8tgee3ni663l8dqt861h.apps.googleusercontent.com',
        // 		'offline': true,
        // 		'scopes':'profile email'

        // 	})
        // return await this.afauth.auth.signInWithCredential(
        // 	firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))

        // }catch(err){
        // 	console.log(err);
        // }
        // } 

        // async webGoogleLogin(){

        // 	try{
        // const provider=new firebase.auth.GithubAuthProvider();
        // const credential=await this.afauth.auth.signInWithPopup(provider);
        // this.navCtrl.setRoot(FirstPage);
        // 	}
        // catch(err){
        // console.log(err);
        // }
        // }

        // signOut(){
        // 	this.afauth.auth.signOut();
        // 	if(this.platform.is('cordova')){
        // 		this.gplus.logout();
        // 	}
    }


    back() {
        this.navCtrl.setRoot(MainLoginPage);
    }
    res() {
        this.navCtrl.setRoot(ResultsPage);
    }
    try () {
        this.navCtrl.setRoot(TryResultPage);
    }

    // loginWithFb(){
    // this.facebook.login(["email"]).then((loginResponse)=>{

    // 	let credentials= firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);	
    // 	firebase.auth().signInWithCredential(credentials).then((info)=>{
    // 		alert(JSON.stringify(info));
    // 	})
    // })


    // 		let provider= new firebase.auth.FacebookAuthProvider();
    // 		firebase.auth().signInWithRedirect(provider).then(()=>{
    // 			firebase.auth().getRedirectResult().then((result)=>{
    // 				alert(JSON.stringify(result));
    // 			}).catch(function(error){
    // 				alert(JSON.stringify(error));
    // 			});
    // 		})
    // }

    loginWithFb() {
        this.afauth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then(res => {
                console.log('From --FB--');
                alert("Successfully Login");
                console.log(res);
                this.navCtrl.setRoot(FirstPage);

            })
    }
    loginWithGithub() {
        this.afauth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then(res => {
                console.log('From --Github--');
                alert("Successfully Login");
                console.log(res);
                this.navCtrl.setRoot(FirstPage);

            })
    }
}