import { Inventario, Marca, Precio, Subclase, TipoUnidad } from './misc-types';

export interface Producto {
  id: number;
  createdAt: Date;
  descripcion: string;
  codigoProducto: string;
  inhabilitado: boolean;
  oferta: boolean;
  subclase: Subclase;
  marca: Marca;
  inventario: Inventario[];
  precios: Precio[];
}

export interface ProductoView {
  familia: string;
  categorias: {
    categoria: string;
    listaSubclases: string[];
    productos: Producto[];
  }[];
}

export interface ProductoCarrito {
  producto: Producto;
  cantidad: number;
  tipoUnidad: TipoUnidad;
}
