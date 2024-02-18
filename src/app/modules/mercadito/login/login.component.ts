import { Component } from '@angular/core';
import { ProyIngSoftService, Sesion } from '../services/proy-ing-soft.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .main-login {
        height: 100vh;
        width: 100vw;
        display: grid;
        place-content: center;
        background: linear-gradient(to bottom, #212121, #000000);
      }
    `,
  ],
})
export class LoginComponent {
  constructor(private proySrv: ProyIngSoftService) {}
  emailOrAlias = '';
  password = '';

  iniciarSesion() {
    this.proySrv
      .iniciarSesion(this.emailOrAlias, this.password)
      .subscribe((sesiones: Sesion[]) => {
        console.log(sesiones);
      });
  }
}
