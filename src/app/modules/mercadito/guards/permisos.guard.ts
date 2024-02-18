import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DATA_USER_KEY, PERMISOS_KEY } from '../../../config/config';
import { Permisos } from '../interfaces/permisos';

type Modulo =
  | 'dashboard'
  | 'mercadeo'
  | 'recursos-humanos'
  | 'compras'
  | 'ventas';

@Injectable({
  providedIn: 'root',
})
export class PermisosGuard {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const modulo = route.routeConfig?.path as Modulo;
    return this.verificarPermiso(modulo);
  }

  verificarPermiso(modulo: Modulo) {
    const permisos = JSON.parse(
      sessionStorage.getItem(PERMISOS_KEY) ?? '{}'
    ) as Permisos;
    switch (modulo) {
      case 'dashboard':
        return permisos.dashboard;
      case 'mercadeo':
        return permisos.mercadeo;
      case 'recursos-humanos':
        return permisos.recursosHumanos;
      case 'compras':
        return permisos.compras;
      case 'ventas':
        return permisos.ventas;
      default:
        return false;
    }
  }
}
