import { Component } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';
import { Empleado } from '../../interfaces/empleado';

@Component({
  selector: 'recursos-humanos-view',
  templateUrl: './recursos-humanos.component.html',
})
export class RecursosHumanosView {
  empleados: Empleado[] = [];

  constructor(private proySrv: ProyIngSoftService) {
    this.proySrv.getEmpleados().subscribe((res) => {
      this.empleados = res;
    });
  }
}
