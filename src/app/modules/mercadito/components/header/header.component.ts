import { Component, Input } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() colorClass = 'appPrimary';
  constructor(private pryService: ProyIngSoftService) {}
  logout() {
    this.pryService.LOGIN.logout();
  }
  goDashboard() {
    this.pryService.ROUTING.goDashboard();
  }
}
