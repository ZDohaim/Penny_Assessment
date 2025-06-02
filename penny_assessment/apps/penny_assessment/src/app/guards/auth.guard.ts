import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../store/auth/auth.selectors';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    // Check if user is authenticated using the service method
    // which also checks token expiration
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      this.router.navigate(['/signin']);
      return new Observable((observer) => {
        observer.next(false);
        observer.complete();
      });
    }

    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map((authenticated) => {
        if (!authenticated) {
          this.router.navigate(['/signin']);
          return false;
        }
        return true;
      })
    );
  }
}
