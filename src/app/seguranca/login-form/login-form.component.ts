import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutenticacaoService } from './../autenticacao.service';
import { BarraAguardeService } from '../../shared/barra-aguarde/BarraAguardeService.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private barraAguardeService: BarraAguardeService,
              private autenticacaoService: AutenticacaoService,
              private errorHandle: ErrorHandlerService,
              private redirecionar: Router) { }

  ngOnInit() {
    this.barraAguardeService.esconderBarra();
  }

  login(usuario: string, senha: string, form: FormControl) {
    this.autenticacaoService.login(usuario, senha).then(() => {
      this.redirecionar.navigate(['/lancamentos']);
    }).catch(erro => {
      this.errorHandle.handle(erro);
      form.reset();
    });
  }

}
