import { Puesto, TipoPago, Genero } from './misc-types';

export interface Empleado {
  id: number;
  createdAt: Date;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  alias: string;
  salario: number;
  inhabilitado: boolean;
  observaciones: string;
  puesto: Puesto;
  idPuesto: number;
  genero: Genero;
  idGenero: number;
  password?: string;
  tipoPago: TipoPago;
  idTipoPago: number;
  observaciones?: string;
}
