import { Component } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';
import { AlertaService } from '../../../../services/alertas/alerta.service';

@Component({
  selector: 'login-view',
  templateUrl: './login.component.html',
})
export class LoginView {
  constructor(
    private proySrv: ProyIngSoftService,
    private alerta: AlertaService
  ) {}
  emailOrAlias = '';
  password = '';
  loading = false;

  iniciarSesion() {
    if (!this.emailOrAlias || !this.password) {
      return this.alerta.showWarn('Ingrese todos los campos');
    }
    this.loading = true;
    this.proySrv.LOGIN.iniciarSesion(
      this.emailOrAlias,
      this.password
    ).subscribe(() => {
      this.loading = false;
    });
  }
}
