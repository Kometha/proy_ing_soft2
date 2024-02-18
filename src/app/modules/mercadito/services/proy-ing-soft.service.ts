import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DATA_USER_KEY, Header, WEB_SERVICE } from '../../../config/config';
import { EMPTY, catchError, map } from 'rxjs';
import { AlertaService } from '../../../services/alertas/alerta.service';
import { ApiResponse } from '../interfaces/api-response';
import { Empleado } from '../interfaces/empleado';
import { Router } from '@angular/router';
import { Permisos } from '../interfaces/permisos';
import { PERMISOS_MODULOS } from '../../../config/config';
import { PERMISOS_KEY } from '../../../config/config';
import { Producto } from '../interfaces/producto';

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
    const message: string = err?.error?.message;
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
  };
}
