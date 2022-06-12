import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './login/usuario';

import { JwtHelperService } from '@auth0/angular-jwt'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = environment.urlBase + '/api/usuarios'
  tokenUrl: string = environment.urlBase + environment.tokenUrl
  clientId: string = environment.cliendId
  clienteSecret: string = environment.clientSecret
  jwtHelper: JwtHelperService = new JwtHelperService()

  constructor(private http: HttpClient) { }

  salva(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.baseUrl, usuario);
  }

  logar(login: string, senha: string): Observable<any> {

    const params = new HttpParams()
      .set('username', login)
      .set('password', senha)
      .set('grant_type', 'password')

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clienteSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post<any>(this.tokenUrl, params, { headers })

  }

  logout(){
    localStorage.removeItem('token');
  }

  getUsuarioLogado(){
    const token = this.getToken();
    if(token){
      const usuario = this.jwtHelper.decodeToken(token).user_name
      return usuario;
    }
    return null
  }

  isLogado(): boolean {
    const token = this.getToken()
    if (token) {
      const expirado = this.jwtHelper.isTokenExpired(token)
      return !expirado;
    }
    return false;
  }



  getToken() {

    const t = localStorage.getItem('token')
    if (t) {
      const token = JSON.parse(t)
      const jwt = token.access_token;

      return jwt;

    }

    return null;
  }
}
