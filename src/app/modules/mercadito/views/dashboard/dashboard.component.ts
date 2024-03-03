import { Component } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';
import { Permisos } from '../../interfaces/permisos';

@Component({
  selector: 'dashboard-view',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      .cerrar-sesion-text {
        text-decoration: underline;
        text-decoration-color: transparent;
        transition: text-decoration-color 0.3s;
        &:hover {
          text-decoration-color: rgb(239, 68, 68);
        }
      }
    `,
  ],
})
export class DashboardView {
  permisos!: Permisos;

  constructor(private proySrv: ProyIngSoftService) {
    this.permisos = this.proySrv.PERMISOS.getPermisos();
  }

  logout() {
    this.proySrv.LOGIN.logout();
  }
}
