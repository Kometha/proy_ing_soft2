import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMAGES_FOLDERS, URL_BASE } from '../../../../../../config/config';
import { Producto } from '../../../../interfaces/producto';

const IMAGENES_PRODUCTO_URL_BASE = `${URL_BASE}/${IMAGES_FOLDERS.productos}/`;

@Component({
  selector: 'app-card-producto',
  templateUrl: './card-producto.component.html',
})
export class CardProductoComponent {
  @Input() producto!: Producto;
  @Output() clickAddToCart = new EventEmitter<Producto>();

  getUrlImageProducto(producto: Producto) {
    const pseudo = Date.now();
    const agregarPseudo = false;
    return `${IMAGENES_PRODUCTO_URL_BASE}${producto.id}.jpeg${
      agregarPseudo ? `?pseudo=${pseudo}` : ''
    }`;
  }

  getPreciosProducto(producto: Producto) {
    const [firstPrecio] = producto.precios;

    if (firstPrecio) {
      return `L. ${firstPrecio.precio}`;
    }

    return `N/A`;
  }

  getInventarioProducto(producto: Producto) {
    return producto.inventario.reduce((acc, inv) => acc + inv.cantidad, 0);
  }

  handleClickAddToCart() {
    this.clickAddToCart.emit(this.producto);
  }
}
