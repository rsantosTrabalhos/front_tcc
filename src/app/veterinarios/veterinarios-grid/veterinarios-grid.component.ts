import { DecimalPipe } from '@angular/common';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/api';

import { VeterinarioFiltro, VeterinarioService } from '../veterinario.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AutenticacaoService } from '../../seguranca/autenticacao.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './veterinarios-grid.component.html',
  styleUrls: ['./veterinarios-grid.component.css']
})
export class VeterinariosGridComponent {

  constructor(private veterinarioService: VeterinarioService,
              private toasty: ToastyService,
              private confirmacao: ConfirmationService,
              private formatadorDecimal: DecimalPipe,
              private errorHandle: ErrorHandlerService,
              private autenticacaoService: AutenticacaoService) { }

  @Input() veterinarios = [];
  @Input() filtro: VeterinarioFiltro;
  @Input() totalRegistros;
  @Input() totalValor: any = 0;
  @ViewChild('tabela') grid;

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;

    this.filtro.pagina = pagina;

    this.veterinarioService.pesquisar(this.filtro).then(veterinariosEncontrados => {
      debugger;
      this.veterinarios = veterinariosEncontrados;
    }).catch(erro => this.errorHandle.handle(erro));
  }

  excluir(lancamento: any) {
   this.veterinarioService.excluir(lancamento.codigo).then(() => {
      if (this.grid.first === 0) {
        this.filtro.pagina = 0;
        this.veterinarioService.pesquisar(this.filtro).then(lancamentosEncontrados => {
          this.veterinarios = lancamentosEncontrados.lancamentos;
          this.totalRegistros = lancamentosEncontrados.total;
        });
      } else {
        /* Necessário para resetar a posição da pagina do grid e consequentemente fazer a nova pesquisa sem o registro removido */
        this.grid.first = 0;
      }

      this.toasty.success('Lançamento excluído com sucesso!');
    }).catch(erro => this.errorHandle.handle(erro));
  }

  confirmarExclusao(lancamento: any) {
    const valorFormatado = this.formatadorDecimal.transform(lancamento.valor, '1.2-2');

    this.confirmacao.confirm({ message: `Deseja excluir o lançamento da pessoa ${lancamento.pessoa} de valor ${valorFormatado}?`,
                               accept: () => {
                                 this.excluir(lancamento);
                               },
                               reject: () => {
                                
                               } });
  }

}
