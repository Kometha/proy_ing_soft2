export interface Login {
  login: LoginClass;
}

export interface LoginClass {
  id:            number;
  createdAt:     Date;
  nombre:        string;
  apellido:      string;
  email:         string;
  telefono:      string;
  alias:         string;
  salario:       number;
  inhabilitado:  boolean;
  observaciones: string;
  puesto:        Genero;
  genero:        Genero;
  tipoPago:      Genero;
}

export interface Genero {
  id:          number;
  createdAt:   Date;
  descripcion: string;
}
