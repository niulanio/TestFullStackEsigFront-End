import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ResponsaveisService } from 'src/app/responsaveis.service';
import { Responsavel } from '../responsavel';


@Component({
  selector: 'app-responsaveis-list',
  templateUrl: './responsaveis-list.component.html',
  styleUrls: ['./responsaveis-list.component.css']
})
export class ResponsaveisListComponent implements OnInit {

  responsaveis: Responsavel[] = [];
  responsavelSelect: Responsavel;
  messageSuccess: String;
  messageError: String;
  constructor(
    private service: ResponsaveisService,
    private router: Router) {}

  ngOnInit(): void {
    this.service.findAllResponsaveis().subscribe(
      response => {
        this.responsaveis = response;}
    )
  }

  novoCadastro(){
    this.router.navigate(['responsaveis-form'])
  }

  prepararDelete(responsavel: Responsavel){
    this.responsavelSelect = responsavel
  }

  deleteResponsavel(){
    this.service.deleteById(this.responsavelSelect.id)
    .subscribe(
      response => {
        this.messageSuccess="Responsável deletado com sucesso!"
        this.ngOnInit();
      },
      error => this.messageError="Erro ao deletar responsável"
    )
  }
}
