import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-corsi',
  templateUrl: 'corsi.html'
})
export class CorsiPage {

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController) {
  }

  user = firebase.auth().currentUser;
  email= this.user.email;
  elencoCorsi=[];

  iscriviti(c){
    var utente = this.email;
    var nomeCorso = c.nome;
    var giorni = c.giorni;
    var orario = c.orario;
    var immagine = c.immagine;
    var iscritto = JSON.stringify({utente,nomeCorso,giorni,orario,immagine});
    this.http.post('http://localhost:8080/addIscritto',iscritto).pipe( 
            map(res => res.json())
        ).subscribe(request => {
          console.log('POST Response:', request);
        });
    this.showAlert();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Iscritto!',
      subTitle: 'Ti aspettiamo nei nostri impianti, puntuale!',
      buttons: ['OK']
    });
    alert.present();
  }


  ionViewDidLoad() {
    this.http.get('http://localhost:8080/corsi' ).pipe(
     map(res => res.json())
   ).subscribe(listaCorsi => {
   for(var x in listaCorsi.Corsi){
     this.elencoCorsi[x]=listaCorsi.Corsi[x];
     console.log("Oggetto nell indice: ",x + " ",this.elencoCorsi[x]);
   
   }      
 });

  }
  
}
