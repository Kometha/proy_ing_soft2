import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoCarrito } from '../../../../interfaces/producto';

@Component({
  selector: 'app-card-producto-carrito',
  templateUrl: './card-producto-carrito.component.html',
})
export class CardProductoCarritoComponent {
  @Input() productoCarrito!: ProductoCarrito;
  @Output() productoCarritoChange = new EventEmitter<ProductoCarrito>();

  @Output() clickRemoveFromCart = new EventEmitter<ProductoCarrito>();

  handleClickRemoveFromCart() {
    this.clickRemoveFromCart.emit(this.productoCarrito);
  }

  handleChangeProductoCarrito() {
    this.productoCarritoChange.emit(this.productoCarrito);
  }

  getTiposUnidad() {
    return this.productoCarrito.producto.precios.map(
      (precio) => precio.tipoUnidad
    );
  }

  getPrecioByTipoUnidad() {
    const {
      tipoUnidad: { id: tipoUnidadId },
    } = this.productoCarrito;

    const precio = this.productoCarrito.producto.precios.find(
      (precio) => precio.tipoUnidad.id === tipoUnidadId
    );

    if (precio) {
      return `L. ${precio.precio}`;
    }

    return 'N/A';
  }

  getSubtotal() {
    const {
      tipoUnidad: { id: tipoUnidadId },
    } = this.productoCarrito;

    const precio = this.productoCarrito.producto.precios.find(
      (precio) => precio.tipoUnidad.id === tipoUnidadId
    );

    if (precio) {
      return `L. ${precio.precio * this.productoCarrito.cantidad}`;
    }

    return 'N/A';
  }
}
