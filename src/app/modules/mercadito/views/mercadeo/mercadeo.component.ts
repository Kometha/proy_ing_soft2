import { Component } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';
import { Producto } from '../../interfaces/producto';
import { AlertaService } from '../../../../services/alertas/alerta.service';

@Component({
  selector: 'mercadeo-view',
  templateUrl: './mercadeo.component.html',
})
export class MercadeoView {
  productos: Producto[] = [];
  constructor(
    private pryService: ProyIngSoftService,
    private alerta: AlertaService
  ) {
    this.getProductos();
  }

  getProductos() {
    this.alerta.showInfo('Cargando productos...');
    this.pryService.PRODUCTOS.getProductos().subscribe((res) => {
      this.productos = res;
      console.log(this.productos);
    });
  }
}
