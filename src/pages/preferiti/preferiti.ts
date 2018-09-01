import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import firebase from 'firebase';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the PreferitiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preferiti',
  templateUrl: 'preferiti.html',
})
export class PreferitiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public toastCtrl: ToastController) {
  }
  visualizzaProdotti= [];
  user = firebase.auth().currentUser;
  
  email = this.user.email;


  rimuoviPreferito(p){
    var codice = p.codice;
    this.http.get('http://localhost:8080/rimuoviPreferito/' + this.email+'/'+codice).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('GET Response:', response);
    });
    this.removeToast();
  }

  

  removeToast() {
    const toast = this.toastCtrl.create({
      message: 'Prodotto eliminato dai preferiti',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  ionViewDidLoad() {
    var eUtente = this.email;
    var utente = JSON.stringify({eUtente});
    this.http.post('http://localhost:8080/preferiti',utente).pipe(
     map(res => res.json())
   ).subscribe(productList => {
   for(var x in productList.Prodotti){
     this.visualizzaProdotti[x]=productList.Prodotti[x];
     console.log("Oggetto nell indice: ",x + " ",this.visualizzaProdotti[x]);
    }      
  });
  }
}
