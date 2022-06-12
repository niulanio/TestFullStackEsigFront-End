import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { RouterGuard } from '../router.guard';
import { TarefasFormComponent } from './tarefas-form/tarefas-form.component';
import { TarefasListComponent } from './tarefas-list/tarefas-list.component';

const routes: Routes = [

  {
    path: '', component: LayoutComponent, children: [
      { path: 'tarefas-form', component: TarefasFormComponent, canActivate: [RouterGuard] },
      { path: 'tarefas-form/:id', component: TarefasFormComponent, canActivate: [RouterGuard] },
      { path: 'tarefas-list', component: TarefasListComponent, canActivate: [RouterGuard] },
      { path: '', redirectTo: '/home',pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarefasRoutingModule { }
