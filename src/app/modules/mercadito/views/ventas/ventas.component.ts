import { Component } from '@angular/core';
import {
  Producto,
  ProductoCarrito,
  ProductoView,
} from '../../interfaces/producto';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';
import { CART_KEY } from '../../../../config/config';
import { Cliente } from '../../interfaces/cliente';

@Component({
  selector: 'ventas-view',
  templateUrl: './ventas.component.html',
})
export class VentasView {
  productos: Producto[] = [];
  productosViewOriginal: ProductoView[] = [];
  productosView: ProductoView[] = [];
  viewSeleccionada?: ProductoView;
  viewSeleccionadaBkp?: ProductoView;
  searchInput = '';
  visibleSideBarCarrito = false;
  productosCarrito: ProductoCarrito[] = [];

  clientes: Cliente[] = [];
  inputSearchCliente = '';
  clienteEncontrado?: Cliente;
  inputsClienteDisabled = true;
  nuevoCliente: Cliente = {
    id: 0,
    createdAt: new Date(),
    dni: '',
    nombreCompleto: '',
    telefono: '',
  };

  visibleModalFacturar = true;
  visibleModalCliente = false;

  constructor(private pryIngSoftService: ProyIngSoftService) {
    this.getProductos();
    this.getClientes();
    this.restoreCarrito();
  }

  getProductos() {
    this.pryIngSoftService.PRODUCTOS.getProductos().subscribe((response) => {
      this.productos = response.splice(0, 100);
      this.productosViewOriginal = this.agruparProductosPorFamilia(
        this.productos
      );
      this.productosView = this.productosViewOriginal;
      const [firstView] = this.productosView;
      if (firstView) this.selectView(firstView);
    });
  }

  getClientes() {
    this.pryIngSoftService.CLIENTES.getClientes().subscribe((response) => {
      this.clientes = response;
    });
  }

  selectView(view: ProductoView) {
    this.viewSeleccionada = view;
    this.viewSeleccionadaBkp = structuredClone(view);
    this.searchInput = '';
  }

  searchProductos() {
    const str = this.searchInput.trim().toLowerCase();
    // ! Variables:
    // - str: string (input del usuario)
    // - viewSeleccionada: ProductoView (vista seleccionada)
    // - viewSeleccionadaBkp: ProductoView (vista seleccionada de respaldo que es original y podemos usar para restaurar la vista seleccionada)

    // 1. La vista seleccionada se restaura a su estado original
    const vistaSeleccionadaCloned = structuredClone(this.viewSeleccionadaBkp);

    console.log(vistaSeleccionadaCloned);

    // 2. Si el input está vacío retornamos, no hacemos nada.
    if (!str) {
      this.viewSeleccionada = vistaSeleccionadaCloned;
      return;
    }

    console.log({
      viewSeleccionada: this.viewSeleccionada,
      vistaSeleccionadaCloned,
    });

    if (!this.viewSeleccionada) return;
    if (!vistaSeleccionadaCloned) return;

    // 3. Si el input no está vacío, filtramos los productos para cada categoría de la vista seleccionada
    this.viewSeleccionada.categorias = vistaSeleccionadaCloned.categorias.map(
      (categoria) => {
        const productos = categoria.productos.filter((producto) => {
          const descripcion = producto.descripcion.toLowerCase();
          return descripcion.includes(str);
        });

        return {
          ...categoria,
          productos,
        };
      }
    );
  }

  // Función para convertir el array de productos en la estructura deseada
  agruparProductosPorFamilia(productos: Producto[]) {
    const productosAgrupados: ProductoView[] = [];

    productos.forEach((producto) => {
      const familia = producto.subclase.categoria.familia.descripcion;
      const categoria = producto.subclase.categoria.descripcion;
      const subclase = producto.subclase.descripcion;

      const familiaIndex = productosAgrupados.findIndex(
        (productoView) => productoView.familia === familia
      );

      if (familiaIndex === -1) {
        productosAgrupados.push({
          familia,
          categorias: [
            {
              categoria,
              listaSubclases: [subclase],
              productos: [producto],
            },
          ],
        });
      } else {
        const categoriaIndex = productosAgrupados[
          familiaIndex
        ].categorias.findIndex(
          (categoriaView) => categoriaView.categoria === categoria
        );

        if (categoriaIndex === -1) {
          productosAgrupados[familiaIndex].categorias.push({
            categoria,
            listaSubclases: [subclase],
            productos: [producto],
          });
        } else {
          const subclaseIndex = productosAgrupados[familiaIndex].categorias[
            categoriaIndex
          ].listaSubclases.findIndex(
            (subclaseView) => subclaseView === subclase
          );

          if (subclaseIndex === -1) {
            productosAgrupados[familiaIndex].categorias[
              categoriaIndex
            ].listaSubclases.push(subclase);
          }

          productosAgrupados[familiaIndex].categorias[
            categoriaIndex
          ].productos.push(producto);
        }
      }
    });

    return productosAgrupados;
  }

  restoreCarrito() {
    const carrito = localStorage.getItem(CART_KEY);
    if (!carrito) return;

    this.productosCarrito = JSON.parse(carrito);
  }

  setCarrito() {
    localStorage.setItem(CART_KEY, JSON.stringify(this.productosCarrito));
  }

  addProductoToCarrito(producto: Producto) {
    const [firstPrecio] = producto.precios;
    if (!firstPrecio) return;

    const { tipoUnidad } = firstPrecio;
    const productoCarrito: ProductoCarrito = {
      producto,
      cantidad: 1,
      tipoUnidad,
    };

    // ! Si el producto ya está en el carrito, aumentamos la cantidad
    const productoIndex = this.productosCarrito.findIndex(
      (p) => p.producto.id === producto.id
    );

    if (productoIndex !== -1) {
      this.productosCarrito[productoIndex].cantidad++;
      return;
    }

    this.productosCarrito.push(productoCarrito);

    this.setCarrito();

    this.visibleSideBarCarrito = true;
  }

  removeProductoFromCarrito(producto: ProductoCarrito) {
    const productoIndex = this.productosCarrito.findIndex(
      (p) => p.producto.id === producto.producto.id
    );

    if (productoIndex === -1) return;
    this.productosCarrito.splice(productoIndex, 1);

    this.setCarrito();
  }

  getTotalCarrito() {
    return this.productosCarrito.reduce((acc, producto) => {
      const { precio } = producto.producto.precios.find(
        (p) => p.tipoUnidad === producto.tipoUnidad
      ) ?? { precio: 0 };

      return acc + precio * producto.cantidad;
    }, 0);
  }

  handleClickCheckout() {
    this.visibleSideBarCarrito = false;
    this.visibleModalFacturar = true;
  }

  searchCliente() {
    // La mascara es: 0000-0000-00000
    // 15 caracteres
    // 4-4-5
    // Reemplazar los guiones y los guiones_bajos
    const str = this.inputSearchCliente.trim().toLowerCase();
    const strWithOutMask = str.replace(/-|_/g, '');

    if (!strWithOutMask) return;

    this.clienteEncontrado = this.clientes.find(
      (cliente) => cliente.dni === str
    );

    this.inputsClienteDisabled = true;

    if (strWithOutMask.length === 13 && !this.clienteEncontrado) {
      this.inputsClienteDisabled = false;
    }
  }

  handleClickCreateCliente() {
    if (this.inputSearchCliente.length !== 15) return;
  }
}
