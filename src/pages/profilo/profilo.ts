import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { OrdiniPage } from '../ordini/ordini';
import firebase from 'firebase';
import { PreferitiPage } from '../preferiti/preferiti';
import { DatiPersonaliPage } from '../dati-personali/dati-personali';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';
import { MieicorsiPage } from '../mieicorsi/mieicorsi';
import { AbbonamentoPage } from '../abbonamento/abbonamento';

@Component({
  selector: 'page-profilo',
  templateUrl: 'profilo.html'
})
export class ProfiloPage {

  datiProfilo : Observable<any>;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth,private afDatabase : AngularFireDatabase) {
  }


  user = firebase.auth().currentUser;
  email = this.user.email;

  goToAbb(){
    this.navCtrl.push(AbbonamentoPage);
  }

  goToOrdini(){
    this.navCtrl.push(OrdiniPage);
  }

  goToDatiPersonali(){
    this.navCtrl.push(DatiPersonaliPage);
  }

  goToPreferiti(){
    this.navCtrl.push(PreferitiPage);
  }

  goToCorsi(){
    this.navCtrl.push(MieicorsiPage);
  }

  logout(){
    this.afAuth.auth.signOut();
	  this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(data => {
     this.datiProfilo = this.afDatabase.object(`Profilo/${data.uid}`).valueChanges()
    })
  }
  
}
