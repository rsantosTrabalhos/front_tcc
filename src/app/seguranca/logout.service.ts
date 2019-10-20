import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';

import { AutenticacaoService } from './autenticacao.service';

@Injectable()
export class LogoutService {

  tokensRevokeUrl = 'http://localhost:8090/tokens/revoke';

  constructor(private autenticacaoService: AutenticacaoService,
              private http: AuthHttp) { }

logout() {
  return this.http.delete(this.tokensRevokeUrl, { withCredentials: true }).toPromise().then(() => {
    this.autenticacaoService.limparAccessToken();
  });
}

}
