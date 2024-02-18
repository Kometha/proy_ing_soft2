import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Header, WEB_SERVICE } from '../../../config/config';
import { BehaviorSubject, EMPTY, Observable, catchError, map } from 'rxjs';

const URL_BASE = `${WEB_SERVICE}proyecto-is2`;
let headers = new HttpHeaders(Header);

@Injectable({
  providedIn: 'root',
})
export class ProyIngSoftService {
  constructor(private http: HttpClient) {}

  private handleError = (err: { error: { message: string } }): typeof EMPTY => {
    const message: string = err?.error?.message;
    console.error(message);
    return EMPTY;
  };

  iniciarSesion(emailOrAlias: string, password: string): Observable<Sesion> {
    const url = `${URL_BASE}/login/${emailOrAlias}/${password}`;

    return this.http.get<Sesion>(url, { headers }).pipe(
      map((sesiones: Sesion) => {
        sessionStorage.setItem('usuario', sesiones.usuario);
        sessionStorage.setItem('contrasenia', sesiones.contrasenia);
        return sesiones;
      }),
      catchError(this.handleError)
    );
  }
}

export interface Sesion {
  usuario: string;
  contrasenia: string;
}
