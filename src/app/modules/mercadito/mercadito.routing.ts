import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SessionGuard } from './guards/session.guard';
import { RecursosHumanosComponent } from './views/recursos-humanos/recursos-humanos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [SessionGuard],
    canLoad: [SessionGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'recursos-humanos',
    component: RecursosHumanosComponent,
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
