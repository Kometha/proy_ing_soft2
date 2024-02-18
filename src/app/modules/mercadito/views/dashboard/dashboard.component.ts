import { Component } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';
import { Permisos } from '../../interfaces/permisos';

@Component({
  selector: 'dashboard-view',
  templateUrl: './dashboard.component.html',
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
