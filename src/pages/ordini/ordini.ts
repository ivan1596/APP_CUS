import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { HomePage } from '../home/home';

/**
 * Generated class for the OrdiniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordini',
  templateUrl: 'ordini.html',
})
export class OrdiniPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
  }
  visualizzaProdotti= [];
  user = firebase.auth().currentUser;
  
  email = this.user.email;

  goToHome(){
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    var eUtente = this.email;
    var utente = JSON.stringify({eUtente});
    this.http.post('http://localhost:8080/ordini', utente).pipe(
     map(res => res.json())
   ).subscribe(productList => {
   for(var x in productList.Prodotti){
     this.visualizzaProdotti[x]=productList.Prodotti[x];
     console.log("Oggetto nell indice: ",x + " ",this.visualizzaProdotti[x]);
    }      
  });
  }

}
