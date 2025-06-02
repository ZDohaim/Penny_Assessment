import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      exhaustMap((action) =>
        this.authService.signup(action.signupData).pipe(
          map((user) => AuthActions.signupSuccess({ user })),
          catchError((error) =>
            of(
              AuthActions.signupFailure({
                error: error.error?.message || 'Signup failed',
              })
            )
          )
        )
      )
    )
  );

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signin),
      exhaustMap((action) =>
        this.authService.signin(action.signinData).pipe(
          map((authResponse) => AuthActions.signinSuccess({ authResponse })),
          catchError((error) =>
            of(
              AuthActions.signinFailure({
                error: error.error?.message || 'Signin failed',
              })
            )
          )
        )
      )
    )
  );

  signinSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signinSuccess),
        tap(() => {
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap(() => {
          this.router.navigate(['/signin']);
        })
      ),
    { dispatch: false }
  );

  signout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signout),
        tap(() => {
          this.authService.signout();
          this.router.navigate(['/signin']);
        })
      ),
    { dispatch: false }
  );

  loadUserFromStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loadUserFromStorage),
        tap(() => {
          // This effect just triggers the reducer to load from localStorage
          // The actual loading is handled in the reducer
        })
      ),
    { dispatch: false }
  );
}
