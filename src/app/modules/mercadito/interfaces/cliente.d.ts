import { GeneralData } from './misc-types';

export interface Cliente extends Omit<GeneralData, 'descripcion'> {
  dni: string;
  nombreCompleto: string;
  telefono: string;
}
