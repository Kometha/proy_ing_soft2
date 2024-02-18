import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MercaditoRoutingModule } from './mercadito.routing';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [LoginComponent, DashboardComponent],
  imports: [CommonModule, MercaditoRoutingModule, PrimeNgModule],
})
export class MercaditoModule {}
