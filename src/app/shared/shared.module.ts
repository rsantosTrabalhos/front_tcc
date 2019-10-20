import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { BarraAguardeComponent } from './barra-aguarde/barra-aguarde.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessageComponent, BarraAguardeComponent],
  exports: [MessageComponent, BarraAguardeComponent]
})
export class SharedModule { }
