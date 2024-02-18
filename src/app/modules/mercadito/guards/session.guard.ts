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
import { DATA_USER_KEY } from '../../../config/config';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard {
  constructor(private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.verificarSession();
  }
  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.verificarSession();
  }

  verificarSession() {
    const userLogged = JSON.parse(
      sessionStorage.getItem(DATA_USER_KEY) ?? '{}'
    );

    if (!userLogged.id) {
      this.router.navigate(['mercadito/login']);
      return false;
    }

    return true;
  }
}
