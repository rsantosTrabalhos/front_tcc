import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';


import { VeterinariosPesquisaComponent } from './veterinarios-pesquisa/veterinarios-pesquisa.component';
import { VeterinariosGridComponent } from './veterinarios-grid/veterinarios-grid.component';
import { SharedModule } from '../shared/shared.module';
import { VeterinariosRoutingModule } from './veterinarios-routing.module';
import { VeterinarioCadastroComponent } from './veterinario-cadastro/veterinario-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    SharedModule,
    VeterinariosRoutingModule
  ],
  declarations: [
    VeterinarioCadastroComponent,
    VeterinariosPesquisaComponent,
    VeterinariosGridComponent
  ],
  exports: [
    VeterinarioCadastroComponent,
    VeterinariosPesquisaComponent
  ]
})
export class VeterinariosModule { }
