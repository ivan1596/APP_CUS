import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import firebase from 'firebase';

/**
 * Generated class for the MieicorsiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mieicorsi',
  templateUrl: 'mieicorsi.html',
})
export class MieicorsiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public toastCtrl: ToastController) {
  }
  elencoCorsi=[];
  user = firebase.auth().currentUser;
  email= this.user.email;

  

  rimuoviIscr(c){
    var corso = c.nome;
    this.http.get('http://localhost:8080/rimuoviCorso/' + this.email+'/'+corso).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('GET Response:', response);
    });
    this.removeToast();
  }

  

  removeToast() {
    const toast = this.toastCtrl.create({
      message: 'Iscrizione Annullata!',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  

  ionViewDidLoad() {
    var eUtente = this.email;
    var utente = JSON.stringify({eUtente});
    this.http.post('http://localhost:8080/mieicorsi',utente ).pipe(
     map(res => res.json())
     ).subscribe(listaCorsi => {
     for(var x in listaCorsi.Corsi){
     this.elencoCorsi[x]=listaCorsi.Corsi[x];
     console.log("Oggetto nell indice: ",x + " ",this.elencoCorsi[x]);
   
    }      
  });

  }

}
