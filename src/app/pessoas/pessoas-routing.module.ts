import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { SegurancaGuard } from '../seguranca/seguranca.guard';

const rotas: Routes = [
  {
    path: '',
    component: PessoasPesquisaComponent,
    canActivate: [SegurancaGuard],
    data: { roles: [ 'ROLE_PESQUISAR_PESSOA' ] }
  },
  {
    path: 'novo',
    component: PessoaCadastroComponent,
    canActivate: [SegurancaGuard],
    data: { roles: [ 'ROLE_CADASTRAR_PESSOA' ] }
  },
  {
    path: ':codigo',
    component: PessoaCadastroComponent,
    canActivate: [SegurancaGuard],
    data: { roles: [ 'ROLE_PESQUISAR_PESSOA' ] }
  }
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
export class PessoasRoutingModule { }
