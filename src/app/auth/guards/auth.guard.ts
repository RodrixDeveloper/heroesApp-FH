import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanMatch {

  constructor(
    private _authService:AuthService, 
    private router:Router
    ){
  }


  private checkAuthStatus():boolean | Observable<boolean> {
    return this._authService.checkAutentication()
    .pipe(
      tap(isAuthenticated => console.log('isAuthenticated',isAuthenticated),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login']);
          console.log("no estoy autenticado");
          
        }
      }),
      )
    )
  }
 
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    // console.log('canMatch ');
    // console.log({route});
    // return false;
    return this.checkAuthStatus()
  }

  canActivate( route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean | Observable<boolean> {
    // console.log('canActivate ');
    // console.log({route, state});
    // return false;
    return this.checkAuthStatus();
  }
}
