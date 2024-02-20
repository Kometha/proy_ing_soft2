import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MercaditoRoutingModule } from './mercadito.routing';
import { LoginView } from './views/login/login.component';
import { DashboardView } from './views/dashboard/dashboard.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ModuleCardComponent } from './views/dashboard/components/module-card/module-card.component';
import { RouterModule } from '@angular/router';
import { RecursosHumanosView } from './views/recursos-humanos/recursos-humanos.component';
import { HeaderComponent } from './components/header/header.component';
import { ComprasView } from './views/compras/compras.component';
import { MercadeoView } from './views/mercadeo/mercadeo.component';
import { VentasView } from './views/ventas/ventas.component';
import { CardProductoComponent } from './views/ventas/components/card-producto/card-producto.component';
import { CardProductoCarritoComponent } from './views/ventas/components/card-producto-carrito/card-producto-carrito.component';

@NgModule({
  declarations: [
    // ! Views
    LoginView,
    DashboardView,
    RecursosHumanosView,
    ComprasView,
    MercadeoView,
    VentasView,

    // ! Components
    HeaderComponent,
    ModuleCardComponent,
    CardProductoComponent,
    CardProductoCarritoComponent,
  ],
  imports: [CommonModule, MercaditoRoutingModule, PrimeNgModule, RouterModule],
})
export class MercaditoModule {}
