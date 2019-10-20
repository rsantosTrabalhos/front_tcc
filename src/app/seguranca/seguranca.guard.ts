import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AutenticacaoService } from './autenticacao.service';

@Injectable()
export class SegurancaGuard implements CanActivate {

  constructor(private autenticacaoService: AutenticacaoService,
              private redirecionar: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.autenticacaoService.isAccessTokenInvalido()) {
      return this.autenticacaoService.obterNovoAccessToken().then(() => {
        if (this.autenticacaoService.isAccessTokenInvalido()) {
          this.redirecionar.navigate(['/login']);
          return false;
        }
        return true;
      });
    } else if (next.data.roles && this.autenticacaoService.verificarPermissoes(next.data.roles) === false) {
      this.redirecionar.navigate(['/nao-autorizado']);
      return false;
    }
    return true;
  }
}
