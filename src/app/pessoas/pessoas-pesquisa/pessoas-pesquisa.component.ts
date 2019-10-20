import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AutenticacaoService } from '../../seguranca/autenticacao.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [];
  filtro = new PessoaFiltro();
  totalRegistros = 0;

  constructor(private pessoaService: PessoaService,
              private titulo: Title,
              private errorHandle: ErrorHandlerService,
              private autenticacaoService: AutenticacaoService) { }

  ngOnInit() {
    this.titulo.setTitle('Pesquisa de Pessoas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro).then(pessoasEncontradas => {
      this.pessoas = pessoasEncontradas.pessoas;
      this.totalRegistros = pessoasEncontradas.total;
    }).catch(erro => this.errorHandle.handle(erro));
  }

}
