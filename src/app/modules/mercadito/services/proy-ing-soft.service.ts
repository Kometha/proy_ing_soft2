import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DATA_USER_KEY, Header, WEB_SERVICE } from '../../../config/config';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { AlertaService } from '../../../services/alertas/alerta.service';
import { ApiResponse } from '../interfaces/api-response';
import { Empleado } from '../interfaces/empleado';
import { Router } from '@angular/router';
import { Permisos } from '../interfaces/permisos';
import { PERMISOS_MODULOS } from '../../../config/config';
import { PERMISOS_KEY } from '../../../config/config';
import { Producto } from '../interfaces/producto';
import {
  Categoria,
  Familia,
  Genero,
  Marca,
  Precio,
  Puesto,
  Subclase,
  TipoPago,
  TipoUnidad,
} from '../interfaces/misc-types';

const URL_BASE = `${WEB_SERVICE}proyecto-is2`;
let headers = new HttpHeaders(Header);

@Injectable({
  providedIn: 'root',
})
export class ProyIngSoftService {
  constructor(
    private http: HttpClient,
    private alerta: AlertaService,
    private router: Router
  ) {}

  private handleError = (err: { error: { message: string } }): typeof EMPTY => {
    const message: string = err?.error?.message ?? 'Error desconocido';
    this.alerta.showError(message);
    return EMPTY;
  };

  LOGIN = {
    iniciarSesion: (emailOrAlias: string, password: string) => {
      const url = `${URL_BASE}/login/${emailOrAlias}/${password}`;

      return this.http.get<ApiResponse<Empleado>>(url, { headers }).pipe(
        map(({ message, data }) => {
          if (!data) {
            this.alerta.showWarn(message);
            return;
          }
          sessionStorage.setItem(DATA_USER_KEY, JSON.stringify(data));
          this.PERMISOS.setPermisos();
          this.alerta.showSuccess('Usuario autenticado correctamente');
          this.ROUTING.goDashboard();

          return data;
        }),
        catchError(this.handleError)
      );
    },
    logout: () => {
      sessionStorage.removeItem(DATA_USER_KEY);
      this.PERMISOS.deletePermisos();
      this.ROUTING.goLogin();
    },
  };

  PERMISOS = {
    setPermisos: () => {
      const usuario = JSON.parse(
        sessionStorage.getItem(DATA_USER_KEY) || '{}'
      ) as Empleado;
      const nuevosPermisos: Permisos = {
        dashboard: true,
        recursosHumanos: PERMISOS_MODULOS.recursosHumanos.includes(
          usuario.puesto.id
        ),
        mercadeo: PERMISOS_MODULOS.mercadeo.includes(usuario.puesto.id),
        compras: PERMISOS_MODULOS.compras.includes(usuario.puesto.id),
        ventas: PERMISOS_MODULOS.ventas.includes(usuario.puesto.id),
      };
      sessionStorage.setItem(PERMISOS_KEY, JSON.stringify(nuevosPermisos));
    },
    getPermisos: () => {
      return JSON.parse(sessionStorage.getItem(PERMISOS_KEY) || '{}');
    },
    deletePermisos: () => {
      sessionStorage.removeItem(PERMISOS_KEY);
    },
  };

  ROUTING = {
    goLogin: () => {
      this.router.navigate(['mercadito/login']);
    },
    goDashboard: () => {
      this.router.navigate(['mercadito/dashboard']);
    },
  };

  PRODUCTOS = {
    getProductos: () => {
      const url = `${URL_BASE}/productos`;
      return this.http.get<ApiResponse<Producto[]>>(url, { headers }).pipe(
        map(({ message, data }) => {
          if (!data) {
            this.alerta.showWarn(message);
            return [];
          }
          return data;
        }),
        catchError(this.handleError)
      );
    },
    updateProducto: ({
      id,
      descripcion,
      marca: { id: idMarca },
      inhabilitado,
      oferta,
    }: Producto) => {
      const url = `${URL_BASE}/productos/${id}`;
      const body = {
        descripcion,
        idMarca,
        inhabilitado,
        oferta,
      };
      return this.http.put<ApiResponse<Producto>>(url, body, { headers }).pipe(
        map(({ isSuccess, message }) => {
          if (!isSuccess) {
            this.alerta.showWarn(message);
            return;
          }
        }),
        catchError(this.handleError)
      );
    },
    crearProducto: (props: {
      descripcion: string;
      idSubclase: number;
      idMarca: number;
    }) => {
      const url = `${URL_BASE}/productos`;
      const body = { ...props };
      return this.http.post<ApiResponse<Producto>>(url, body, { headers }).pipe(
        map(({ isSuccess, message, data }) => {
          if (!isSuccess) {
            this.alerta.showWarn(message);
            return;
          }
          return data;
        }),
        catchError(this.handleError)
      );
    },
    getFamilias: () => {
      const url = `${URL_BASE}/familias`;
      return this.http.get<ApiResponse<Familia[]>>(url, { headers }).pipe(
        map(({ message, data }) => {
          if (!data) {
            this.alerta.showWarn(message);
            return [];
          }
          return data;
        }),
        catchError(this.handleError)
      );
    },
    getCategorias: () => {
      const url = `${URL_BASE}/categorias`;
      return this.http.get<ApiResponse<Categoria[]>>(url, { headers }).pipe(
        map(({ message, data }) => {
          if (!data) {
            this.alerta.showWarn(message);
            return [];
          }
          return data;
        }),
        catchError(this.handleError)
      );
    },
    getSubclases: () => {
      const url = `${URL_BASE}/subclases`;
      return this.http.get<ApiResponse<Subclase[]>>(url, { headers }).pipe(
        map(({ message, data }) => {
          if (!data) {
            this.alerta.showWarn(message);
            return [];
          }
          return data;
        }),
        catchError(this.handleError)
      );
    },
    updateImageProducto: (id: number, base64: string) => {
      const url = `${URL_BASE}/productos/uploadImage/${id}`;
      const body = { base64 };
      return this.http.post<ApiResponse<Producto>>(url, body, { headers }).pipe(
        map(({ isSuccess, message }) => {
          if (!isSuccess) {
            this.alerta.showWarn(message);
            return;
          }
        }),
        catchError(this.handleError)
      );
    },
  };

  EMPLEADOS = {
    getEmpleados: () => {
      return this.http
        .get<ApiResponse<Empleado[]>>(`${URL_BASE}/empleados`, { headers }) // Ajusta any a la estructura real de tu respuesta
        .pipe(
          map((response) => response.data), // Accede a la propiedad 'data' de la respuesta
          catchError(this.handleError)
        );
    },
    getGeneros: () => {
      return this.http
        .get<ApiResponse<Genero[]>>(`${URL_BASE}/generos`, { headers }) // Ajusta any a la estructura real de tu respuesta
        .pipe(
          map((response) => response.data), // Accede a la propiedad 'data' de la respuesta
          catchError(this.handleError)
        );
    },
    crearEmpleado: (empleado: Empleado) => {
      return this.http
        .post<ApiResponse<Empleado>>(`${URL_BASE}/empleados`, empleado, {
          headers,
        })
        .pipe(
          map((response) => response.data), // Accede a la propiedad 'data' de la respuesta
          catchError(this.handleError)
        );
    },
  };

  PRECIOS = {
    setPrecioProducto: (
      idProducto: number,
      idTipoUnidad: number,
      precio: number
    ) => {
      const url = `${URL_BASE}/precios-productos/${idProducto}`;
      const body = { idTipoUnidad, precio };

      return this.http.post<ApiResponse<Precio>>(url, body, { headers }).pipe(
        map(({ isSuccess, message }) => {
          if (!isSuccess) {
            this.alerta.showWarn(message);
            return;
          }
        }),
        catchError(this.handleError)
      );
    },
    deletePrecio: (id: number) => {
      const url = `${URL_BASE}/precios-productos/${id}`;
      return this.http.delete<ApiResponse<Precio>>(url, { headers }).pipe(
        map(({ isSuccess, message }) => {
          if (!isSuccess) {
            this.alerta.showWarn(message);
            return;
          }
        }),
        catchError(this.handleError)
      );
    },
  };

  TIPOS_O_FORMAS = {
    getTiposUnidades: () => {
      const url = `${URL_BASE}/tipos-unidades`;
      return this.http.get<ApiResponse<TipoUnidad[]>>(url, { headers }).pipe(
        map(({ message, data }) => {
          if (!data) {
            this.alerta.showWarn(message);
            return [];
          }
          return data;
        }),
        catchError(this.handleError)
      );
    },
    getTiposPago: () => {
      const url = `${URL_BASE}/tipo-pago`;
      return this.http.get<ApiResponse<TipoPago[]>>(url, { headers }).pipe(
        map(({ message, data }) => {
          if (!data) {
            this.alerta.showWarn(message);
            return [];
          }
          return data;
        }),
        catchError(this.handleError)
      );
    },
  };

  MARCAS = {
    getMarcas: () => {
      const url = `${URL_BASE}/marcas`;
      return this.http.get<ApiResponse<Marca[]>>(url, { headers }).pipe(
        map(({ message, data }) => {
          if (!data) {
            this.alerta.showWarn(message);
            return [];
          }
          return data;
        }),
        catchError(this.handleError)
      );
    },
  };

  PUESTOS = {
    getPuestos: () => {
      const url = `${URL_BASE}/puestos`;
      return this.http.get<ApiResponse<Puesto[]>>(url, { headers }).pipe(
        map(({ message, data }) => {
          if (!data) {
            this.alerta.showWarn(message);
            return [];
          }
          return data;
        }),
        catchError(this.handleError)
      );
    },
  };
}
