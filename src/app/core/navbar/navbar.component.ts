import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutenticacaoService } from '../../seguranca/autenticacao.service';
import { LogoutService } from './../../seguranca/logout.service';
import { ErrorHandlerService } from './../../core/error-handler.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService,
              private logoutService: LogoutService,
              private errorHandle: ErrorHandlerService,
              private redirecionar: Router) { }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout().then(() => {
      this.redirecionar.navigate(['/login']);
    }).catch(erro => this.errorHandle.handle(erro));
  }

}
