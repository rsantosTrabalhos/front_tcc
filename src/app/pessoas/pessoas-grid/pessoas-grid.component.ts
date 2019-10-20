import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/components/common/api';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AutenticacaoService } from '../../seguranca/autenticacao.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  constructor(private pessoasService: PessoaService,
              private confirmacao: ConfirmationService,
              private toasty: ToastyService,
              private errorHandle: ErrorHandlerService,
              private autenticacaoService: AutenticacaoService) { }

  @Input() pessoas = [];
  @Input() filtro: PessoaFiltro;
  @Input() totalRegistros;
  @ViewChild('tabela') grid;

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;

    this.filtro.pagina = pagina;

    this.pessoasService.pesquisar(this.filtro).then(pessoasEncontrados => {
      this.pessoas = pessoasEncontrados.pessoas;
      this.totalRegistros = pessoasEncontrados.total;
    }).catch(erro => this.errorHandle.handle(erro));  }

  excluir(pessoa: any) {
    this.pessoasService.excluir(pessoa.codigo).then(() => {
       if (this.grid.first === 0) {
         this.filtro.pagina = 0;
         this.pessoasService.pesquisar(this.filtro).then(pessoasEncontrados => {
           this.pessoas = pessoasEncontrados.pessoas;
           this.totalRegistros = pessoasEncontrados.total;
         });
       } else {
         this.grid.first = 0;
       }

       this.toasty.success('Pessoa excluída com sucesso!');
     }).catch(erro => this.errorHandle.handle(erro));
   }

  confirmarExclusao(pessoa: any) {
    this.confirmacao.confirm({ message: `Deseja excluir a pessoa ${pessoa.nome}?`,
                               accept: () => {
                                 this.excluir(pessoa);
                               },
                               reject: () => {
                               } });
  }

  mudarStatus(pessoa: any) {
    if (this.autenticacaoService.verificarPermissao('ROLE_CADASTRAR_PESSOA')) {
      this.pessoasService.ativar(pessoa.codigo, pessoa.ativo ? false : true).then(() => {
        if (this.grid.first === 0) {
          this.filtro.pagina = 0;
          this.pessoasService.pesquisar(this.filtro).then(pessoasEncontrados => {
            this.pessoas = pessoasEncontrados.pessoas;
            this.totalRegistros = pessoasEncontrados.total;
          });
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Status atualizado com sucesso!');
      }).catch(erro => this.errorHandle.handle(erro));
    } else {
      this.toasty.warning('Sem permissão!');
    }
  }
}
