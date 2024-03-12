import { Puesto, TipoPago, Genero } from './misc-types';

export interface Empleado {
  id: number;
  createdAt: Date;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  alias: string;
  password: string;
  salario: number;
  inhabilitado: boolean;
  observaciones: string;
  puesto: Puesto;
  genero: Genero;
  tipoPago: TipoPago;
  observaciones?: string;
}

export interface EmpleadoCreate {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  idPuesto: number;
  idGenero: number;
  alias: string;
  password: string;
  salario: number;
  idTipoPago: number;
  observaciones?: string;
  inhabilitado?: boolean;
}
