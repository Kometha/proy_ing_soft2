export interface CreateFactura {
  empleado: {
    id: number;
  };
  cliente: {
    dni: string;
    nombreCompleto: string;
    telefono: string;
  };
  formaPago: {
    id: number;
  };
  productosFactura: {
    idProducto: number;
    idTipoUnidad: number;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }[];
}
