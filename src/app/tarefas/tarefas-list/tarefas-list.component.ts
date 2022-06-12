import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ResponsaveisService } from 'src/app/responsaveis.service';
import { Responsavel } from 'src/app/responsaveis/responsavel';
import { TarefasService } from 'src/app/tarefas.service';

import { Tarefa } from '../tarefa';

@Component({
  selector: 'app-tarefas-list',
  templateUrl: './tarefas-list.component.html',
  styleUrls: ['./tarefas-list.component.css']
})
export class TarefasListComponent implements OnInit {
  
  tarefa : Tarefa;
  tarefaSelect: Tarefa
  tarefas : Tarefa[];
  responsaveis : Responsavel[]
  messageSuccess: String;
  messageError: String;


  constructor(
    private tarefaService: TarefasService,
    private responsavelService:ResponsaveisService,
    private router: Router) {
      this.tarefa = new Tarefa();
     }

  ngOnInit(): void {

    this.responsavelService.findAllResponsaveis().subscribe(
      response => this.responsaveis = response  
    );

    this.tarefaService.findAllTarefas().subscribe(
      response => this.tarefas = response
    )
   
  }

  onSubmit(){
    this.tarefaService.findByParams(this.tarefa).subscribe(
      response => this.tarefas = response
    )
  }


  preparaConcluirTarefa(tarefa: Tarefa){
    this.tarefaSelect = tarefa
  }
  concluirTarefa(){
    this.tarefaSelect.status = 2
    this.tarefaService.update(this.tarefaSelect).subscribe(
     response =>{ this.messageSuccess="Tarefa concluída com sucesso!"
        this.ngOnInit();
    },
    error => this.messageError="Erro ao concluir tarefa"
    )
  }

  preparaDelete(tarefa: Tarefa){
    this.tarefaSelect = tarefa
  }

  deleteTarefa(){
    this.tarefaService.deleteById(this.tarefaSelect.id).subscribe(
      response => {
        this.messageSuccess="Tarefa deletado com sucesso!"
        this.ngOnInit();
      },
      error => this.messageError="Erro ao deletar tarefa"
    )
  }


}
