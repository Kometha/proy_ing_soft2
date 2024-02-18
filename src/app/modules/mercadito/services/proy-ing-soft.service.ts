import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DATA_USER, Header, WEB_SERVICE } from '../../../config/config';
import { EMPTY, catchError, map } from 'rxjs';
import { AlertaService } from '../../../services/alertas/alerta.service';
import { ApiResponse } from '../interfaces/api-response';
import { Empleado } from '../interfaces/empleado';
import { Router } from '@angular/router';

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
          sessionStorage.setItem(DATA_USER, JSON.stringify(data));
          this.alerta.showSuccess('Usuario autenticado correctamente');
          this.router.navigate(['mercadito/dashboard']);
          return data;
        }),
        catchError(this.handleError)
      );
    },
  };
}
