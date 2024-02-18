import { Component } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';

@Component({
  selector: 'dashboard-view',
  templateUrl: './dashboard.component.html',
})
export class DashboardView {
  constructor(private proySrv: ProyIngSoftService) {}
  logout() {
    this.proySrv.LOGIN.logout();
  }
}
