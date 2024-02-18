import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosComponent } from './components/empleados/empleados.component';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [
    EmpleadosComponent
  ],
  imports: [CommonModule, SharedModule],
})
export class MercaditoModule {}
