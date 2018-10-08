import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { ProfiloPage } from '../profilo/profilo';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-abbonamento',
  templateUrl: 'abbonamento.html',
})
export class AbbonamentoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public alertCtrl: AlertController) {
  }
  user = firebase.auth().currentUser;
  email= this.user.email;
  elencoScadenza = [];
  

  rinnovaAbb1(){
    var tipoRinnovo = 1;
    var utente = this.email;
    var datiRinnovo = JSON.stringify({tipoRinnovo,utente});
    this.http.post('http://localhost:8080/rinnova',datiRinnovo).pipe( 
    map(res => res.json())
      ).subscribe(request => {
        console.log('POST Response:', request);
      });
    this.showConfirm(tipoRinnovo);
  }

  rinnovaAbb3(){
    var tipoRinnovo = 3;
    var utente = this.email;
    var datiRinnovo = JSON.stringify({tipoRinnovo,utente});
    this.http.post('http://localhost:8080/rinnova',datiRinnovo).pipe( 
    map(res => res.json())
      ).subscribe(request => {
        console.log('POST Response:', request);
      });
    this.showConfirm(tipoRinnovo);
  }

  rinnovaAbb12(){
    var tipoRinnovo = 12;
    var utente = this.email;
    var datiRinnovo = JSON.stringify({tipoRinnovo,utente});
    this.http.post('http://localhost:8080/rinnova',datiRinnovo).pipe( 
    map(res => res.json())
      ).subscribe(request => {
        console.log('POST Response:', request);
      });
    this.showConfirm(tipoRinnovo);
  }


  showConfirm(tipoRinnovo) {
    const confirm = this.alertCtrl.create({
      title: 'Rinnovo Effettuato!',
      message: "Hai rinnovato l' abbonamento per " + tipoRinnovo + " mese/i",
      buttons: [
        {
          text: 'Profilo',
          handler: () => {
            this.navCtrl.push(ProfiloPage);
          }
        },
        {
          text: 'Home',
          handler: () => {
            this.navCtrl.push(HomePage);
          }
        }
      ]
    });
    confirm.present();
  }

  doRefresh(refresher) {
    console.log('Inizio operazione asincrona', refresher);
    this.caricaScadenza();
    setTimeout(() => {
      console.log('Fine operazione asincrona');
      refresher.complete();
    }, 1500);
  }

  caricaScadenza(){
    var eUtente = this.email;
    var utente = JSON.stringify({eUtente});
    this.http.post('http://localhost:8080/scadenza',utente ).pipe(
     map(res => res.json())
     ).subscribe(listaScadenza => {
     for(var x in listaScadenza.Scadenza){
     this.elencoScadenza[x]=listaScadenza.Scadenza[x];
     console.log("Oggetto nell indice: ",x + " ",this.elencoScadenza[x]);
   
    }      
  });
  }

  ionViewDidLoad() {
    this.caricaScadenza();
  }

}
