interface GeneralData {
  id: number;
  createdAt: Date;
  descripcion: string;
}

export interface Genero extends GeneralData {}
export interface Puesto extends GeneralData {}
export interface TipoPago extends GeneralData {}
