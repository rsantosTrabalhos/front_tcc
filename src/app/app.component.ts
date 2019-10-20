import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private toastyConfig: ToastyConfig,
              private rota: Router) {
    this.toastyConfig.theme = 'bootstrap';
  }

  exibirNavbar() {
    return this.rota.url !== '/login';
  }
}
