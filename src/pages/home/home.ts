import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfiloPage } from '../profilo/profilo';
import { NegozioPage } from '../negozio/negozio';
import { CorsiPage } from '../corsi/corsi';
import { ContattaciPage } from '../contattaci/contattaci';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }
  goToProfilo(params){
    if (!params) params = {};
    this.navCtrl.push(ProfiloPage);
  }goToNegozio(params){
    if (!params) params = {};
    this.navCtrl.push(NegozioPage);
  }goToCorsi(params){
    if (!params) params = {};
    this.navCtrl.push(CorsiPage);
  }goToContattaci(params){
    if (!params) params = {};
    this.navCtrl.push(ContattaciPage);
  }
}