import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent } from 'primeng/components/common/api';

import { VeterinarioService, LancamentoFiltro } from '../veterinario.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AutenticacaoService } from '../../seguranca/autenticacao.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './veterinarios-pesquisa.component.html',
  styleUrls: ['./veterinarios-pesquisa.component.css']
})
export class VeterinariosPesquisaComponent implements OnInit {

  lancamentos = [];
  filtro = new LancamentoFiltro();
  pt: any;
  totalRegistros = 0;
  totalValor: any = 0;

  constructor(private lancamentoService: VeterinarioService,
              private errorHandle: ErrorHandlerService,
              private titulo: Title,
              private autenticacaoService: AutenticacaoService) { }

  ngOnInit() {
    this.pt = {
      firstDayOfWeek: 1,
      dayNames: [ 'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado' ],
      dayNamesShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb' ],
      dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
      monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
      monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
      today: 'Hoje',
      clear: 'Limpar'
    };

    this.titulo.setTitle('Pesquisa de Veterinários');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro).then(lancamentosEncontrados => {
      
    }).catch(erro => this.errorHandle.handle(erro));
  }
}
