import { Injectable } from '@angular/core';
import { /* Http,  Headers, */ URLSearchParams } from '@angular/http';

/* Conversor de Data */
import * as moment from 'moment';
import { AuthHttp } from 'angular2-jwt';

import { BarraAguardeService } from '../shared/barra-aguarde/BarraAguardeService.service';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable()
export class VeterinarioService {

  lancamentosUrl = 'http://localhost:8090/doggis';

  constructor(private http: AuthHttp,
              private barraAguardeService: BarraAguardeService) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    this.barraAguardeService.mostrarBarra();

    let params = new URLSearchParams();
    /* const headers = new Headers(); */
    /* headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='); */

    params = this.validarFiltro(filtro.descricao, 'descricao', 'string', params);
    params = this.validarFiltro(filtro.dataVencimentoInicio, 'dataVencimentoDe', 'date', params);
    params = this.validarFiltro(filtro.dataVencimentoFim, 'dataVencimentoAte', 'date', params);
    params = this.validarFiltro(filtro.pagina.toString(), 'page', 'string', params);
    params = this.validarFiltro(filtro.itensPorPagina.toString(), 'size', 'string', params);

    const promessa = this.http.get(`${this.lancamentosUrl}/veterinarios`, { /* headers, */ search: params }).toPromise().then(
      response => { const responseJson = response.json();
                    const lancamentos = responseJson.content;

                    const resultado = {
                       lancamentos: lancamentos,
                       total: responseJson.totalElements
                    };

                    this.barraAguardeService.esconderBarra();

                    return resultado;
                  }
    );

    return promessa;

  }

  pesquisarPorCodigo(codigo: number): Promise<any> {
    this.barraAguardeService.mostrarBarra();

    /* const headers = new Headers(); */
    /* headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='); */

    const promessa = this.http.get(`${this.lancamentosUrl}/${codigo}`, { /* headers */ }).toPromise().then(response => {
      this.barraAguardeService.esconderBarra();
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

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { /* headers */ }).toPromise().then(() => null);
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

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    /* const headers = new Headers(); */
    /* headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='); */
    /* headers.append('Content-Type', 'Application/json'); */

    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento), { /* headers */ }).toPromise().then(response => response.json());
  }

  editar(lancamento: Lancamento): Promise<Lancamento> {
    this.barraAguardeService.mostrarBarra();

    /* Necessário visto que na documentação do back não requer estes atributos, somente os códigos */
    this.removerAtributos(lancamento);

    /* const headers = new Headers(); */
    /* headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='); */
    /* headers.append('Content-Type', 'Application/json'); */

    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, JSON.stringify(lancamento), { /* headers */ }).toPromise().
      then(response => {
        const lancamentoAlterado = response.json();
        this.validarDataLancamento([lancamentoAlterado]);

        this.barraAguardeService.esconderBarra();
        return lancamentoAlterado;
    });
  }

  validarDataLancamento(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
      lancamento.dataPagamento = lancamento.dataPagamento ? moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate() : null;
    }
  }

  removerAtributos(lancamento: Lancamento) {
    delete lancamento.categoria['nome'];
    delete lancamento.pessoa['nome'];
    delete lancamento.pessoa['ativo'];
    delete lancamento.pessoa['enderecoPessoa'];
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
