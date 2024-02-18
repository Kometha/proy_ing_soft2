import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginView } from './views/login/login.component';
import { DashboardView } from './views/dashboard/dashboard.component';
import { SessionGuard } from './guards/session.guard';
import { RecursosHumanosView } from './views/recursos-humanos/recursos-humanos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardView,
    canActivate: [SessionGuard],
    canLoad: [SessionGuard],
  },
  {
    path: 'login',
    component: LoginView,
  },
  {
    path: 'recursos-humanos',
    component: RecursosHumanosView,
    canActivate: [SessionGuard],
    canLoad: [SessionGuard],
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
