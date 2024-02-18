import { Component } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(private proySrv: ProyIngSoftService) {}
  logout() {
    this.proySrv.LOGIN.logout();
  }
}
