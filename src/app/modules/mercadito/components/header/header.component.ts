import { Component } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private pryService: ProyIngSoftService) {}
  logout() {
    this.pryService.LOGIN.logout();
  }
  goDashboard() {
    this.pryService.ROUTING.goDashboard();
  }
}
