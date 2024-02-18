import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/mercadito/login/login.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full',
},
{
  path: 'mercadito',
  loadChildren: () =>
    import('./modules/mercadito/mercadito.module').then((m) => m.MercaditoModule),
},
{
  path: 'login',
  component: LoginComponent,
},
{
  path: '**',
  redirectTo: '/login',
  pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
