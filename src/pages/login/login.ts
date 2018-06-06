import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
/*import { RegistrazionePage } from '../registrazione/registrazione';*/
import { HomePage } from '../home/home';
/*import { ProfiloPage } from '../profilo/profilo';*/
/* import { NegozioPage } from '../negozio/negozio';
import { CorsiPage } from '../corsi/corsi';
import { ContattaciPage } from '../contattaci/contattaci'; */
import { OAuthService } from 'angular-oauth2-oidc';

declare const OktaAuth: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('email') email: any;
  private username: string;
  private password: string;
  private error: string;

  constructor(public navCtrl: NavController, private oauthService: OAuthService) {
    oauthService.redirectUri = window.location.origin;
    oauthService.clientId = '0oafc7sys1hRDn3Ys0h7';
    oauthService.scope = 'openid profile email';
    oauthService.oidc = true;
    oauthService.issuer = 'https://dev-569422.oktapreview.com';

  }

  login(): void {
    this.oauthService.createAndSaveNonce().then(nonce => {
      const authClient = new OktaAuth({
        clientId: this.oauthService.clientId,
        redirectUri: this.oauthService.redirectUri,
        url: this.oauthService.issuer
      });
      authClient.signIn({
        username: this.username,
        password: this.password
      }).then((response) => {
        if (response.status === 'SUCCESS') {
          authClient.token.getWithoutPrompt({
            nonce: nonce,
            responseType: ['id_token', 'token'],
            sessionToken: response.sessionToken,
            scopes: this.oauthService.scope.split(' ')
          })
            .then((tokens) => {
              // oauthService.processIdToken doesn't set an access token
              // set it manually so oauthService.authorizationHeader() works
              localStorage.setItem('access_token', tokens[1].accessToken);
              this.oauthService.processIdToken(tokens[0].idToken, tokens[1].accessToken);
              this.navCtrl.push(HomePage);
            })
            .catch(error => console.error(error));
        } else {
          throw new Error('We cannot handle the ' + response.status + ' status');
        }
      }).fail((error) => {
        console.error(error);
        this.error = error.message;
      });
    });
  }
  /* goToRegistrazione(params){
    if (!params) params = {};
    this.navCtrl.push(RegistrazionePage);
  }goToHome(params){
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  }goToProfilo(params){
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
  } */
}
