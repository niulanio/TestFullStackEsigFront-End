import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  login:string;
  senha:string;
  loginError:boolean;
  newUser: boolean
  messageSuccess:any
  erros: String[]

  onSubmit(){

    this.loginService.logar(this.login, this.senha).subscribe(
      response =>{
        const token =JSON.stringify(response)
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
      },errorResponse =>{
        this.erros = ["Usuário e/ou senha incorretos"];
      }
    )
    

  
  }

  preparaNovoUsuario(event:any){
    event.preventDefault();
    this.newUser = true;
  }

  cancelNewUser(){
    this.newUser = false;
  }

  cadastrarNovoUsuario(){
    let usuario: Usuario = new Usuario()
    usuario.login = this.login;
    usuario.senha = this.senha;

    this.loginService.salva(usuario).subscribe(
      response => {
        this.messageSuccess = "Cadastro Realizado com sucesso!";
        this.newUser = false;
        usuario.login = '';
        usuario.senha = '';
        this.erros = [];
       
     }
      , errorResponse=> {
        this.messageSuccess = null;
        this.erros =errorResponse.error.errors;
      }
    );
  }

}
