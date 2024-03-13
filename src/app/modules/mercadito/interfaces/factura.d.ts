import { Cliente } from './cliente';
import { Empleado } from './empleado';
import { FormaPago } from './forma-pago';
import { TipoUnidad } from './misc-types';
import { Producto } from './producto';

export interface Factura {
  id: number;
  createdAt: Date;
  total: number;
  nula: boolean;
  cliente: Cliente;
  empleado: Empleado;
  formaPago: FormaPago;
  detalle: Detalle[];
}

export interface Detalle {
  id: number;
  cantidad: number;
  producto: Producto;
  subtotal: number;
  createdAt: Date;
  idFactura: number;
  tipoUnidad: TipoUnidad;
  precioUnitario: number;
}
