import { Component } from '@angular/core';
import { ProyIngSoftService } from '../services/proy-ing-soft.service';
import { AlertaService } from '../../../services/alertas/alerta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private proySrv: ProyIngSoftService,
    private alerta: AlertaService
  ) {}
  emailOrAlias = '';
  password = '';

  iniciarSesion() {
    if (!this.emailOrAlias || !this.password) {
      return this.alerta.showWarn('Ingrese todos los campos');
    }
    this.proySrv.LOGIN.iniciarSesion(
      this.emailOrAlias,
      this.password
    ).subscribe(() => {});
  }
}
