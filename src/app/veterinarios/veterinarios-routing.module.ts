import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { VeterinariosPesquisaComponent } from './veterinarios-pesquisa/veterinarios-pesquisa.component';
import { VeterinarioCadastroComponent } from './veterinario-cadastro/veterinario-cadastro.component';
import { SegurancaGuard } from '../seguranca/seguranca.guard';

const rotas: Routes = [
  {
    path: '',
    component: VeterinariosPesquisaComponent,
    canActivate: [SegurancaGuard],
    data: { roles: [ 'ROLE_PESQUISAR_LANCAMENTO' ] }
  },
  {
    path: 'novo',
    component: VeterinarioCadastroComponent,
    canActivate: [SegurancaGuard],
    data: { roles: [ 'ROLE_CADASTRAR_LANCAMENTO' ] }
  },
  /* Rota para satisfazer a busca de lançamento pelo código */
  { path: ':codigo',
    component: VeterinarioCadastroComponent,
    canActivate: [SegurancaGuard],
    data: { roles: [ 'ROLE_PESQUISAR_LANCAMENTO' ] }
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
export class VeterinariosRoutingModule { }
