import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class BarraAguardeService {

  constructor() { }

  mostrarBarra() {
    const divAguarde = this.getDiv();
    debugger;
    if (divAguarde) {
      // divAguarde.style.display = 'inline';
    }
  }

  esconderBarra() {
    const divAguarde = this.getDiv();

    if (divAguarde) {
     // divAguarde.style.display = 'none';
    }
  }

  getDiv(): HTMLDivElement {
    return document.getElementById('fundo') as HTMLDivElement;
  }
}
