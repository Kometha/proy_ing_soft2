import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedor } from '../../interfaces/proveedor';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
})
export class ComprasView {
  proveedores: Proveedor[] = [
    { id: 1, descripcion: 'Proveedor 1' },
    { id: 2, descripcion: 'Proveedor 2' },
    { id: 3, descripcion: 'Proveedor 3' },
    { id: 4, descripcion: 'Proveedor 4' },
    { id: 5, descripcion: 'Proveedor 5' },
    { id: 6, descripcion: 'Proveedor 6' },
    { id: 7, descripcion: 'Proveedor 7' },
    { id: 8, descripcion: 'Proveedor 8' },
    { id: 9, descripcion: 'Proveedor 9' },
    { id: 10, descripcion: 'Proveedor 10' },
    { id: 11, descripcion: 'Proveedor 11' },
    { id: 12, descripcion: 'Proveedor 12 ' },
  ];

  constructor(private router: Router) {}

  visibleModalMantProducto = false;
  visibleModalIngresarProducto = false;
  visibleModalGenerarCompra = false;
}
