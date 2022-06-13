import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { response } from 'express';
import { Observable } from 'rxjs';
import { ResponsaveisService } from 'src/app/responsaveis.service';
import { Responsavel } from 'src/app/responsaveis/responsavel';
import { TarefasService } from 'src/app/tarefas.service';
import { Tarefa } from '../tarefa';

@Component({
  selector: 'app-tarefas-form',
  templateUrl: './tarefas-form.component.html',
  styleUrls: ['./tarefas-form.component.css']
})
export class TarefasFormComponent implements OnInit {


  tarefa: Tarefa;
  responsaveis: Responsavel[]
  error: String = '';
  success: boolean;
  id_selecionado: number
  erros: String[]

  constructor(
    private tarefaService: TarefasService,
    private responsavelService: ResponsaveisService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.tarefa = new Tarefa();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params
    params.subscribe(urlParams => {
      this.id_selecionado = urlParams['id'];
      if (this.id_selecionado) {
        this.carregaTarefa(this.id_selecionado)
      }
    })

    this.responsavelService.findAllResponsaveis().subscribe(
      response => this.responsaveis = response
    );

  }

  onSubmit() {
    this.success = false;
    if (this.id_selecionado) {
      this.tarefaService.update(this.tarefa).subscribe(
        response => {
          this.success = true;
        }, errorResponse => {
          this.erros = ["Erro ao atualizar o tarefa"]
        }
      )
    } else {
      
      this.tarefaService.save(this.tarefa).subscribe(
        response => {
          this.success = true;
          this.tarefa = response
          this.tarefa.prioridade = this.tarefa.prioridade - 1
  
        }, errorResponse => {
          console.log(errorResponse)
          this.erros =errorResponse.error.errors;
        })
    }
  }

 

  carregaTarefa(id: any) {
    if (this.id_selecionado) {
      this.tarefaService.findById(id).subscribe(
        response => {
          this.tarefa = response
          this.tarefa.prioridade = this.tarefa.prioridade - 1
        },
        error => {
          console.log("Aconteceu um erro")
        }

      );
    }
  }


}
