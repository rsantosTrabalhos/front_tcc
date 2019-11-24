import { Injectable } from '@angular/core';
import { /* Http,  Headers, */ URLSearchParams } from '@angular/http';

/* Conversor de Data */
import * as moment from 'moment';
import { AuthHttp } from 'angular2-jwt';

import { BarraAguardeService } from '../shared/barra-aguarde/BarraAguardeService.service';
import { Lancamento, Veterinario } from '../core/model';

export class VeterinarioFiltro {
  nome: string;
  cpf: string;
  rg: string;
  registroConselho: string;
  especialidade: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable()
export class VeterinarioService {

  veterinarioUrl = 'http://localhost:8090/doggis';

  constructor(private http: AuthHttp,
              private barraAguardeService: BarraAguardeService) { }

  pesquisar(filtro: VeterinarioFiltro): Promise<any> {
    

    let params = new URLSearchParams();
    /* const headers = new Headers(); */
    /* headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='); */

    params = this.validarFiltro(filtro.nome, 'nome', 'string', params);
    params = this.validarFiltro(filtro.cpf, 'cpf', 'string', params);
    params = this.validarFiltro(filtro.rg, 'rg', 'string', params);
    params = this.validarFiltro(filtro.rg, 'registroConselho', 'string', params);
    params = this.validarFiltro(filtro.rg, 'especialidade', 'string', params);
    params = this.validarFiltro(filtro.pagina.toString(), 'page', 'string', params);
    params = this.validarFiltro(filtro.itensPorPagina.toString(), 'size', 'string', params);

    return this.http.get(`${this.veterinarioUrl}/veterinarios`, { /* headers, */ search: params }).toPromise().then(
      response => response.json());
  }

  pesquisarPorCodigo(codigo: number): Promise<any> {
    

    /* const headers = new Headers(); */
    /* headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='); */

    const promessa = this.http.get(`${this.veterinarioUrl}/${codigo}`, { /* headers */ }).toPromise().then(response => {
      
      const lancamentoEncontrado = response.json();
      this.validarDataLancamento([lancamentoEncontrado]);

      return lancamentoEncontrado;
    });

    return promessa;
  }

  validarFiltro(filtro: any, nomeFiltro: string, tipoFiltro: string, params: URLSearchParams): URLSearchParams {
    if (filtro) {
      if ('string' === tipoFiltro) {
        params.set(nomeFiltro, filtro);
      } else {
        params.set(nomeFiltro, moment(filtro).format('YYYY-MM-DD') );
      }
    }

    return params;
  }

  excluir(codigo: number): Promise<void> {
    /* const headers = new Headers(); */
    /* headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='); */

    return this.http.delete(`${this.veterinarioUrl}/${codigo}`, { /* headers */ }).toPromise().then(() => null);
  }

  totalizar(lancamentos: any): Number {
    let totalValor = 0;
    lancamentos.forEach((lancamento: any) => {
      if (lancamento['valor'] != null) {
        totalValor = totalValor + parseFloat(lancamento['valor']);
      }
    });

    return totalValor;
  }

  adicionar(veterinario: Veterinario): Promise<Veterinario> {
    /* const headers = new Headers(); */
    /* headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='); */
    /* headers.append('Content-Type', 'Application/json'); */

    return this.http.post(this.veterinarioUrl + '/veterinario/', JSON.stringify(veterinario), { /* headers */ }).toPromise().then(response => response.json());
  }

  editar(veterinario: Veterinario): Promise<Veterinario> {
    debugger

    /* const headers = new Headers(); */
    /* headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='); */
    /* headers.append('Content-Type', 'Application/json'); */

    return this.http.put(`${this.veterinarioUrl}/veterinario/${veterinario.codigo}`, JSON.stringify(veterinario), { /* headers */ }).toPromise().
      then(response => {
        const veterinarioAlterado = response.json();
        return veterinarioAlterado;
    });
  }

  validarDataLancamento(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
      lancamento.dataPagamento = lancamento.dataPagamento ? moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate() : null;
    }
  }

  converterParaDate(data: string): Date {
    let dataConvert = null;

    if (moment(data).isValid) {
      dataConvert = moment(data, 'YYYY-MM-DD').toDate;
    } else {
      console.log(`Data informada inválida: ${data}`);
    }

    return dataConvert;
  }
}
