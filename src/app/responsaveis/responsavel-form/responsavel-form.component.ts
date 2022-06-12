import { Component, OnInit } from '@angular/core';
import { ResponsaveisService } from 'src/app/responsaveis.service';
import { Responsavel } from '../responsavel';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { response } from 'express';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-responsavel-form',
  templateUrl: './responsavel-form.component.html',
  styleUrls: ['./responsavel-form.component.css']
})

export class ResponsavelFormComponent implements OnInit {

  responsavel: Responsavel;
  success: boolean;
  error: String = '';
  id_selecionado: number;
  erros: String[]

  constructor(
    private service: ResponsaveisService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.responsavel = new Responsavel();
  }

  ngOnInit(): void {

    let params: Observable<Params> = this.activatedRoute.params
    params.subscribe(urlParams => {
      this.id_selecionado = urlParams['id'];
      if (this.id_selecionado) {
        this.carregaResponsavel(this.id_selecionado)
      }
    })

  }


  onSubmit() {
    this.success = false;
    if (this.id_selecionado) {
      this.service.update(this.responsavel).subscribe(
        response => {
          this.success = true;
          this.erros = []
        }, errorResponse => {
          this.erros = ['Erro ao atualizar o responsável'];
        }
      )
    } else {

      this.service.save(this.responsavel).subscribe(
        response => {
          this.success = true;
          this.responsavel = response
          this.erros = []
        }, errorResponse => {
          this.erros =errorResponse.error.errors;
        })
    }
  }
  voltar() {
    this.router.navigate(['responsaveis-list'])
  }

  carregaResponsavel(id: any) {
    if (this.id_selecionado) {
      this.service.findById(id).subscribe(
        response => {
          this.responsavel = response
        },
        error => {
          console.log("Aconteceu um erro")
        }

      );
    }
  }

}
