import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { BarraAguardeService } from '../../shared/barra-aguarde/BarraAguardeService.service';
import { Lancamento } from '../../core/model';
import { AutenticacaoService } from '../../seguranca/autenticacao.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './veterinario-cadastro.component.html',
  styleUrls: ['./veterinario-cadastro.component.css']
})
export class VeterinarioCadastroComponent implements OnInit {

  pt: any;
  tituloPagina: string;
  formulario: FormGroup;
  
  constructor(private errorHandlerService: ErrorHandlerService,
              private barraAguardeService: BarraAguardeService,
              private toastyService: ToastyService,
              private rota: ActivatedRoute,
              private redirecionar: Router,
              private titulo: Title,
              private autenticacaoService: AutenticacaoService,
              private formBuilder: FormBuilder) { }

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

    this.titulo.setTitle('Novo Veterinário');
    this.tituloPagina = 'Cadastro de Veterinário';
    this.configurarFormulario();
    this.barraAguardeService.esconderBarra();

  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [ null ],
      tipoLancamento: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [ null ],
      descricao: [ null, [ Validators.required, Validators.minLength(5) ] ],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: [ null ]
       }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }) ,
      observacao: []
    });
  }

  submeter() {
    if (this.formulario.get('codigo').value) {
      this.editar();
    } else {
      this.salvar();
    }
  }

  novo() {
    this.formulario.reset();
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.redirecionar.navigate(['/veterinarios/novo']);
  }

  salvar() {
    this.barraAguardeService.mostrarBarra();
  }

  editar() {
    this.barraAguardeService.mostrarBarra();
  }

}
