import { Component } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';
import { Producto } from '../../interfaces/producto';
import { AlertaService } from '../../../../services/alertas/alerta.service';
import { Marca, TipoUnidad } from '../../interfaces/misc-types';

@Component({
  selector: 'mercadeo-view',
  templateUrl: './mercadeo.component.html',
})
export class MercadeoView {
  productos: Producto[] = [];
  producto?: Producto;
  newProducto?: Producto;

  nuevoPrecio: {
    tipoUnidad?: TipoUnidad | null;
    precio: number;
  } = {
    tipoUnidad: null,
    precio: 0,
  };

  codigoProductoBuscado = '01-02-01-0001';

  marcas: Marca[] = [];
  tipoUnidades: TipoUnidad[] = [];
  constructor(
    private pryService: ProyIngSoftService,
    private alerta: AlertaService
  ) {
    this.getProductos();
    this.getMarcas();
    this.getTipoUnidades();
  }

  getProductos() {
    this.pryService.PRODUCTOS.getProductos().subscribe((res) => {
      this.productos = res;
      this.searchProducto();
    });
  }

  getMarcas() {
    this.pryService.MARCAS.getMarcas().subscribe((res) => {
      this.marcas = res;
    });
  }

  getTipoUnidades() {
    this.pryService.TIPOS_O_FORMAS.getTiposUnidades().subscribe((res) => {
      this.tipoUnidades = res;
    });
  }

  nuevoPrecioProducto() {
    const { precio, tipoUnidad } = this.nuevoPrecio;
    if (!tipoUnidad) {
      this.alerta.showWarn('Seleccione un tipo de unidad');
      return;
    }

    this.setPrecioProducto(tipoUnidad, precio);
  }

  setPrecioProducto(tipoUnidad: TipoUnidad, precio: number) {
    {
      if (precio < 0) {
        this.alerta.showWarn('Ingrese un precio válido');
        return;
      }
      this.pryService.PRECIOS.setPrecioProducto(
        this.producto!.id,
        tipoUnidad.id,
        precio
      ).subscribe(() => {
        this.getProductos();
        this.alerta.showSuccess('Precio actualizado');
      });
    }
  }

  deletePrecio(precioId: number) {
    this.pryService.PRECIOS.deletePrecio(precioId).subscribe(() => {
      this.getProductos();
      this.alerta.showSuccess('Precio eliminado');
    });
  }

  updateProducto() {
    this.pryService.PRODUCTOS.updateProducto(this.newProducto!).subscribe(
      () => {
        this.getProductos();
        this.alerta.showSuccess('Producto actualizado');
      }
    );
  }

  handleClickOferta() {
    this.newProducto!.oferta = !this.newProducto!.oferta;
    this.updateProducto();
  }

  handleClickInhabilitado() {
    this.newProducto!.inhabilitado = !this.newProducto!.inhabilitado;
    this.updateProducto();
  }

  handleClickSave() {
    this.updateProducto();
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
