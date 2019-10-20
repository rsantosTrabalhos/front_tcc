import { Http, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { AutenticacaoService } from './autenticacao.service';
import { MoneyHttp } from './money-http';
import { SegurancaGuard } from './seguranca.guard';
import { LogoutService } from './logout.service';

export function authHttpServiceFactory(autenticacaoService: AutenticacaoService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    /* Necessário para requisições cujo json é enviado */
    globalHeaders: [
      { 'Content-Type': 'Application/json' }
    ]
  });
  return new MoneyHttp(autenticacaoService, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,

    SegurancaRoutingModule
  ],
  declarations: [
    LoginFormComponent
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [AutenticacaoService, Http, RequestOptions]
    },
    SegurancaGuard,
    LogoutService
  ],
  exports: [
    LoginFormComponent
  ]
})
export class SegurancaModule { }
