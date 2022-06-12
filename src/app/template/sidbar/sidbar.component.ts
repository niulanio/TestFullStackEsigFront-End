import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css']
})
export class SidbarComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router : Router
    ) { }

  usuarioLogado: string

  ngOnInit(): void {
    this.usuarioLogado = this.loginService.getUsuarioLogado()
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login'])
  }

}
