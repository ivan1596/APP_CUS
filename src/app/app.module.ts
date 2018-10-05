import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrazionePage } from '../pages/registrazione/registrazione';
import { ProfiloPage } from '../pages/profilo/profilo';
import { NegozioPage } from '../pages/negozio/negozio';
import { CorsiPage } from '../pages/corsi/corsi';
import { ContattaciPage } from '../pages/contattaci/contattaci';
import { HttpModule } from '@angular/http';
import {AngularFireModule} from 'angularfire2';
import { HttpClientModule } from '@angular/common/http';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import {CarrelloPage} from '../pages/carrello/carrello';
import {OrdiniPage} from '../pages/ordini/ordini';
import {PreferitiPage} from '../pages/preferiti/preferiti';
import {DatiPersonaliPage} from '../pages/dati-personali/dati-personali';
import {MieicorsiPage} from '../pages/mieicorsi/mieicorsi';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from './app.firebase.conf';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrazionePage,
    ProfiloPage,
    NegozioPage,
    CorsiPage,
    ContattaciPage,
    CarrelloPage,
    OrdiniPage,
    PreferitiPage,
    DatiPersonaliPage,
    MieicorsiPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrazionePage,
    ProfiloPage,
    NegozioPage,
    CorsiPage,
    ContattaciPage,
    CarrelloPage,
    OrdiniPage,
    PreferitiPage,
    DatiPersonaliPage,
    MieicorsiPage
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}