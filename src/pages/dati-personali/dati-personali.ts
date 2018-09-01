import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';
//import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
/**
 * Generated class for the DatiPersonaliPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dati-personali',
  templateUrl: 'dati-personali.html',
})
export class DatiPersonaliPage {

  datiProfilo : Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth:AngularFireAuth,private afDatabase : AngularFireDatabase) {
  }

  


  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(data => {
     this.datiProfilo = this.afDatabase.object(`Profilo/${data.uid}`).valueChanges()
    })
  }

}
