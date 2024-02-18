import { Component } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';
import { Producto } from '../../interfaces/producto';
import { AlertaService } from '../../../../services/alertas/alerta.service';
import { Marca } from '../../interfaces/misc-types';

@Component({
  selector: 'mercadeo-view',
  templateUrl: './mercadeo.component.html',
})
export class MercadeoView {
  productos: Producto[] = [];
  producto?: Producto;
  newProducto?: Producto;

  codigoProductoBuscado = '';

  marcas: Marca[] = [];
  constructor(
    private pryService: ProyIngSoftService,
    private alerta: AlertaService
  ) {
    this.getProductos();
    this.getMarcas();
  }

  getProductos() {
    this.pryService.PRODUCTOS.getProductos().subscribe((res) => {
      this.productos = res;
      this.codigoProductoBuscado = '01-02-01-0001';
      this.searchProducto();
    });
  }

  getMarcas() {
    this.pryService.MARCAS.getMarcas().subscribe((res) => {
      this.marcas = res;
    });
  }

  searchProducto() {
    if (this.codigoProductoBuscado === '') {
      this.alerta.showWarn('Ingrese un código de producto');
      return;
    }
    this.producto = this.productos.find(
      (p) => p.codigoProducto === this.codigoProductoBuscado
    );
    this.newProducto = structuredClone(this.producto);
  }
}
