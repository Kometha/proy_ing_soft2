import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MercaditoRoutingModule } from './mercadito.routing';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ModuleCardComponent } from './views/dashboard/components/module-card/module-card.component';
import { RouterModule } from '@angular/router';
import { RecursosHumanosComponent } from './views/recursos-humanos/recursos-humanos.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    // ! Views
    LoginComponent,
    DashboardComponent,
    RecursosHumanosComponent,

    // ! Components
    HeaderComponent,
    ModuleCardComponent,
  ],
  imports: [CommonModule, MercaditoRoutingModule, PrimeNgModule, RouterModule],
})
export class MercaditoModule {}
