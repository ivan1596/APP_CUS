import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { OrdiniPage } from '../ordini/ordini';
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the CarrelloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrello',
  templateUrl: 'carrello.html',
})
export class CarrelloPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  visualizzaProdotti= [];
  
  
  user = firebase.auth().currentUser;
  email = this.user.email;

  removeToast() {
    const toast = this.toastCtrl.create({
      message: 'Prodotto eliminato dal carrello',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  

    totaleOrdine() : number{
    
     let sum = 0;
     let prodotto = 1;
     this.visualizzaProdotti.forEach(p=>{
      prodotto = p.prezzo*p.quantita;
      sum = prodotto + sum;
      
      });
      
      return sum;
     
  } 


   

  
  showConfirm() {

    
    const confirm = this.alertCtrl.create({
      title: 'Ordine Confermato!',
      message: "Grazie per aver acquistato nel nostro negozio! L'ordine verrà spedito presso il suo indirizzo!  ",
      buttons: [
        {
          text: 'Home',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        },
        {
          text: 'I miei Ordini',
          handler: () => {
            this.navCtrl.setRoot(OrdiniPage);
            //this.navCtrl.push(OrdiniPage);
          }
        }
      ]
    });
    confirm.present();
  }

  

      
  confermaOrdine(visualizzaProdotti){
  this.http.post('http://localhost:8080/confermaOrdine',visualizzaProdotti).pipe( 
    map(res => res.json())
  ).subscribe(request => {
  console.log('POST Response:', request);
  });
  this.showConfirm();
}

  rimuoviProdotto(p){
  var codice = p.codice;
  var quantita = p.quantita;
  this.http.get('http://localhost:8080/rimuoviProdotto/' + this.email+'/'+codice+'/'+quantita).pipe(
    map(res => res.json())
  ).subscribe(response => {
    console.log('GET Response:', response);
  });
  this.removeToast();
  
}
  
  caricaProdotti(){
    var eUtente = this.email;
    var utente = JSON.stringify({eUtente});
    this.http.post('http://localhost:8080/carrello', utente).pipe(
     map(res => res.json())
   ).subscribe(productList => {
   for(var x in productList.Prodotti){
     this.visualizzaProdotti[x]=productList.Prodotti[x];
     console.log("Oggetto nell indice: ",x + " ",this.visualizzaProdotti[x]);
    }      
  });
}  

  doRefresh(refresher) {
  console.log('Inizio operazione asincrona', refresher);
  this.caricaProdotti();
  setTimeout(() => {
    console.log('Fine operazione asincrona');
    refresher.complete();
  }, 1500);
}

  ionViewDidLoad() { this.caricaProdotti(); }
    
 

}
