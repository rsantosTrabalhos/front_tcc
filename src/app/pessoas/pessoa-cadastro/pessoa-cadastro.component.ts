import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { BarraAguardeService } from './../../shared/barra-aguarde/BarraAguardeService.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Pessoa } from '../../core/model';
import { AutenticacaoService } from '../../seguranca/autenticacao.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  tituloPagina: string;

  constructor(private errorHandlerService: ErrorHandlerService,
              private barraAguardeService: BarraAguardeService,
              private pessoaService: PessoaService,
              private toastyService: ToastyService,
              private rota: ActivatedRoute,
              private redirecionar: Router,
              private titulo: Title,
              private autenticacaoService: AutenticacaoService) { }

  ngOnInit() {
    this.tituloPagina = 'Cadastro de Pessoa';
    this.titulo.setTitle('Nova Pessoa');
    const codigoPessoa = this.rota.snapshot.params['codigo'];

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
      this.tituloPagina = 'Edição de Pessoa';
      this.titulo.setTitle('Edição de Pessoa');
    }

    this.barraAguardeService.esconderBarra();
  }

  submeter(form: FormControl) {
    if (this.pessoa.codigo) {
      this.editar(form);
    } else {
      this.salvar(form);
    }
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.redirecionar.navigate(['/pessoas/novo']);
  }

  salvar(form: FormControl) {
    this.barraAguardeService.mostrarBarra();
    this.pessoa.ativo = true;
    this.pessoaService.adicionar(this.pessoa).then(() => {
      this.toastyService.success('Pessoa adicionada com sucesso!');
      form.reset();
      this.pessoa = new Pessoa();
      this.barraAguardeService.esconderBarra();
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  editar(form: FormControl) {
    this.barraAguardeService.mostrarBarra();
    this.pessoaService.editar(this.pessoa).then(pessoa => {
      this.pessoa = pessoa;
      this.toastyService.success('Pessoa alterada com sucesso!');
      this.barraAguardeService.esconderBarra();
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.pesquisarPorCodigo(codigo).then(pessoa => {
      this.pessoa = pessoa;
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

}
