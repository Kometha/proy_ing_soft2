import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginView } from './views/login/login.component';
import { DashboardView } from './views/dashboard/dashboard.component';
import { SessionGuard } from './guards/session.guard';
import { RecursosHumanosView } from './views/recursos-humanos/recursos-humanos.component';
import { MercadeoView } from './views/mercadeo/mercadeo.component';
import { ComprasView } from './views/compras/compras.component';
import { VentasView } from './views/ventas/ventas.component';
import { PermisosGuard } from './guards/permisos.guard';
import { GenerarCompraView } from './views/compras/components/generar-compra/generar-compra.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginView,
  },
  {
    path: 'dashboard',
    component: DashboardView,
    canActivate: [SessionGuard, PermisosGuard],
  },
  {
    path: 'recursos-humanos',
    component: RecursosHumanosView,
    canActivate: [SessionGuard, PermisosGuard],
  },
  {
    path: 'mercadeo',
    component: MercadeoView,
    canActivate: [SessionGuard, PermisosGuard],
  },
  {
    path: 'compras',
    component: ComprasView,
    canActivate: [SessionGuard, PermisosGuard],
  },
  {
    path: 'ventas',
    component: VentasView,
    canActivate: [SessionGuard, PermisosGuard],
  },
  {
    path: 'generar-compra',
    component: GenerarCompraView,
    canActivate: [SessionGuard, PermisosGuard],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MercaditoRoutingModule {}
