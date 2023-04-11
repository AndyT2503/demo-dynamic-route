import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  Routes,
  UrlTree,
} from '@angular/router';
import { Observable, delay, map, of } from 'rxjs';
import { APP_ROUTES } from '../routes';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  private router = inject(Router);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree>{
    return this.fetchDynamicRoutes().pipe(
      map((newRoutes) => {
        const newRouteConfig = [...newRoutes, ...APP_ROUTES];
        this.router.resetConfig(newRouteConfig);
        if (
          newRouteConfig.some((x) => x.path?.includes(state.url.substring(1)))
        ) {
          return this.router.createUrlTree([state.url]);
        }
        return true;
      })
    );
  }

  fetchDynamicRoutes() {
    const newRoutes: Routes = [
      {
        path: 'dynamic',
        loadComponent: () =>
          import('../dynamic/dynamic.component').then(
            (c) => c.DynamicComponent
          ),
      },
    ];
    return of(newRoutes).pipe(delay(100));
  }
}
