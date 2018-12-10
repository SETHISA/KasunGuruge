import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
 
import { Network } from '@ionic-native/network';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InputDataPage } from '../pages/input-data/input-data';
import { TryResultPage } from '../pages/try-result/try-result';
import { ResultsPage } from '../pages/results/results';
import { ExampletestPage } from '../pages/exampletest/exampletest';
import { ShowCartPage } from '../pages/show-cart/show-cart';
import {SignupPage} from '../pages/signup/signup';
import {AdminPage} from '../pages/admin/admin';
import {FirstPage} from '../pages/first/first';
import{MainLoginPage} from '../pages/main-login/main-login';
import{AdminLoginPage} from '../pages/admin-login/admin-login';
import{UserLoginPage} from '../pages/user-login/user-login';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { AbsoluteDrag } from '../components/absolute-drag/absolute-drag';

import { AuthService } from '../services/auth.service';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import {Facebook} from '@ionic-native/facebook';

const firebaseConfig = {
  apiKey: "AIzaSyBMya2crdyEbMTd8of5PZhZG9XiYuStCdk",
  authDomain: "fiton-9b1dc.firebaseapp.com",
  databaseURL: "https://fiton-9b1dc.firebaseio.com",
  projectId: "fiton-9b1dc",
  storageBucket: "",
  messagingSenderId: "906034179889"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InputDataPage,
    TryResultPage,
    ResultsPage,
    AbsoluteDrag,
    ExampletestPage,
    ShowCartPage,
    MainLoginPage,
    AdminLoginPage,
    UserLoginPage,
    AdminPage,
    FirstPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ChartsModule,
    NgxErrorsModule


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InputDataPage,
    TryResultPage,
    ResultsPage,
    ExampletestPage,
    ShowCartPage,
  MainLoginPage,
    AdminPage,
    FirstPage,
    AdminLoginPage,
    UserLoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BarcodeScanner,
    AuthService,
    FirebaseServiceProvider,
    FirebaseServiceProvider,
    Network,
    AngularFireAuth,
    GooglePlus
  

  ]
})
export class AppModule { }
