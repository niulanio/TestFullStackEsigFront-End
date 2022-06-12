import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { RouterGuard } from '../router.guard';
import { ResponsaveisListComponent } from './responsaveis-list/responsaveis-list.component';
import { ResponsavelFormComponent } from './responsavel-form/responsavel-form.component';

const routes: Routes = [

  {
    path: '', component: LayoutComponent, children: [
      { path: 'responsaveis-form', component: ResponsavelFormComponent, canActivate: [RouterGuard] },
      { path: 'responsaveis-form/:id', component: ResponsavelFormComponent, canActivate: [RouterGuard] },
      { path: 'responsaveis-list', component: ResponsaveisListComponent, canActivate: [RouterGuard] },
      { path: '', redirectTo: '/home', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsaveisRoutingModule { }
