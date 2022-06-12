import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsaveisRoutingModule } from './responsaveis-routing.module';
import { ResponsavelFormComponent } from './responsavel-form/responsavel-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResponsaveisListComponent } from './responsaveis-list/responsaveis-list.component';


@NgModule({
  declarations: [
    ResponsavelFormComponent,
    ResponsaveisListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ResponsaveisRoutingModule,
    FormsModule
  ],
  exports:[
    ResponsavelFormComponent
  ]
})
export class ResponsaveisModule { }
