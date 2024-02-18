import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mercadito',
    pathMatch: 'full',
  },
  {
    path: 'mercadito',
    loadChildren: () =>
      import('./modules/mercadito/mercadito.module').then(
        (m) => m.MercaditoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
