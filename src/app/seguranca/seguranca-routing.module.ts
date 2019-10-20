import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginFormComponent } from './login-form/login-form.component';

const rotas: Routes = [
  { path: 'login', component: LoginFormComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(rotas)
  ],
  declarations: [

  ],
  exports: [
    RouterModule
  ]
})
export class SegurancaRoutingModule { }
