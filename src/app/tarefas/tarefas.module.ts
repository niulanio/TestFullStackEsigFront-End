import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarefasRoutingModule } from './tarefas-routing.module';
import { TarefasFormComponent } from './tarefas-form/tarefas-form.component';
import { TarefasListComponent } from './tarefas-list/tarefas-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TarefasFormComponent,
    TarefasListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TarefasRoutingModule,
    FormsModule
    
  ],
  exports:[
    TarefasFormComponent,
    TarefasListComponent
  ]
})
export class TarefasModule { }
