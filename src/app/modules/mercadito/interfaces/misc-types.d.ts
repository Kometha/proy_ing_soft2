interface GeneralData {
  id: number;
  createdAt: Date;
  descripcion: string;
}

export interface Genero extends GeneralData {}
export interface Puesto extends GeneralData {}
export interface TipoPago extends GeneralData {}
export interface Marca extends GeneralData {}
export interface Tienda extends GeneralData {}
export interface TipoUnidad extends GeneralData {
  permiteDecimales: boolean;
}

export interface Inventario {
  id: number;
  tienda: Tienda;
  cantidad: number;
  createdAt: Date;
  idProducto: number;
}

export interface Precio {
  id: number;
  precio: number;
  createdAt: Date;
  idProducto: number;
  tipoUnidad: TipoUnidad;
}

export interface Familia extends GeneralData {
  codigoFamilia: string;
}

export interface Subclase {
  id: number;
  categoria: Categoria;
  createdAt: Date;
  descripcion: string;
  codigoSubclase: string;
}

export interface Categoria {
  id: number;
  familia: Familia;
  createdAt: Date;
  descripcion: string;
  codigoCategoria: string;
}
