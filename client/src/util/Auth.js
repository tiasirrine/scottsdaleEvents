import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'sed.auth0.com',
    clientID: 'mLar8d1tePD6k69LQ7NPUZRX5MTQ8il0',
    redirectUri: 'http://localhost:3000',
    audience: 'https://sed.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}
