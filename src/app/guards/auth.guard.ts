import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { AuthState } from '../models/AuthState';
import { Store } from '@ngrx/store';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(
    private store: Store<{auth: AuthState}>,
    private router: Router,
  ) {}
 
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(state => state.auth.isLoggedIn).pipe(map(isLoggedIn => {
        if (isLoggedIn) { return true; }
        this.router.navigate(['/']);
        return false;
        }
      )
    );
  }
}