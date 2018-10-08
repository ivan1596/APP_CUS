import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {User} from '../../models/user';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoginPage} from '../login/login';
import {Profilo} from '../../models/profilo';
import { AngularFireDatabase } from 'angularfire2/database';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'page-registrazione',
  templateUrl: 'registrazione.html'
})
export class RegistrazionePage {
  user={} as User;
  profilo = {} as Profilo;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth,private afDatabase : AngularFireDatabase, public http: Http) {
  }

  async reg(user : User){
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    console.log(result);
    this.creaProfilo();
    this.navCtrl.push(LoginPage);
    }catch(e){console.error(e)}
  }

  creaProfilo(){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`Profilo/${auth.uid}`).set(this.profilo)
      .then(() => {
       

      });
      
    });
    this.creaAbbonato(this.user);
   }

  creaAbbonato(user : User){
    this.http.get('http://localhost:8080/creaAbbonato/' + user.email).pipe(
    map(res => res.json())
    ).subscribe(response => {
    console.log('GET Response:', response);
    });
  }
}
