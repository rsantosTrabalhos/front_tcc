import { Component, OnInit } from '@angular/core';

import { BarraAguardeService } from '../shared/barra-aguarde/BarraAguardeService.service';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
    <div class="container">
      <h1 class="text-center"> Página não encontrada </h1>
    </div>
  `,
  styles: []
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor(private barraAguardeService: BarraAguardeService) { }

  ngOnInit() {
    this.barraAguardeService.esconderBarra();
  }

}
