import { Component, OnInit } from '@angular/core';

import { BarraAguardeService } from '../shared/barra-aguarde/BarraAguardeService.service';

@Component({
  selector: 'app-nao-autorizado',
  template: `
    <div class="container" >
      <h1 class="text-center">Acesso negado!</h1>
    </div>
  `,
  styles: []
})
export class NaoAutorizadoComponent implements OnInit {

  constructor(private barraAguardeService: BarraAguardeService) { }

  ngOnInit() {
    this.barraAguardeService.esconderBarra();
  }

}
