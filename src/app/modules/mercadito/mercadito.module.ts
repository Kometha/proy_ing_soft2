import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosComponent } from './components/empleados/empleados.component';
import { SharedModule } from 'primeng/api';
import { RrhhComponent } from './components/rrhh/rrhh.component';

@NgModule({
  declarations: [
    EmpleadosComponent,
    RrhhComponent
  ],
  imports: [CommonModule, SharedModule],
})
export class MercaditoModule {}
