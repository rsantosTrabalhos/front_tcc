import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { BarraAguardeService } from '../../shared/barra-aguarde/BarraAguardeService.service';
import { Lancamento } from '../../core/model';
import { AutenticacaoService } from '../../seguranca/autenticacao.service';
import { VeterinarioService } from '../veterinario.service';

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
              private formBuilder: FormBuilder,
              private veterinarioService: VeterinarioService) { }

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
    const codigo = this.rota.snapshot.params['codigo'];
    const codigoPessoa = this.rota.snapshot.params['codigoPessoa'];
    const nome = this.rota.snapshot.params['nome'];
    const cpf = this.rota.snapshot.params['cpf'];
    const rg = this.rota.snapshot.params['rg'];
    const rc = this.rota.snapshot.params['rc'];
    const espe = this.rota.snapshot.params['espe'];

    if (codigo) { 
      this.formulario = this.formBuilder.group({
        codigo: [ codigo ],
        pessoa: this.formBuilder.group({
          codigo: [ codigoPessoa ],
          nome: [ nome ],
          rg: [ rg ],
          cpf: [ cpf ]
         }),
        registroConselho: [ rc ],
        veterinarioTipoPet: this.formBuilder.group({
          codigoVeterinario: [ codigo ],
          codigoTipoPet: [ espe ]
        })
      });
    } else {
      this.formulario = this.formBuilder.group({
        codigo: [ null ],
        pessoa: this.formBuilder.group({
          codigo: [ null ],
          nome: [ null ],
          rg: [ null ],
          cpf: [ null ]
         }),
        registroConselho: [ null ],
        veterinarioTipoPet: this.formBuilder.group({
          codigoVeterinario: [ null ],
          codigoTipoPet: [ null ]
        })
      });
    }

    
  }

  submeter() {
    debugger;
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
    this.veterinarioService.adicionar(this.formulario.value).then(veterinario => {
      this.toastyService.success('Veterinário adicionado com sucesso!');
      this.barraAguardeService.esconderBarra();
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  editar() {
    this.veterinarioService.editar(this.formulario.value).then(veterinario => {
      this.formulario.patchValue(veterinario);
      this.toastyService.success('Veterinário alterado com sucesso!');
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

}
