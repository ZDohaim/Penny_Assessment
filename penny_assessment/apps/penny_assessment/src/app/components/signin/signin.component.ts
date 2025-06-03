import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as AuthActions from '../../store/auth/auth.actions';
import {
  selectAuthLoading,
  selectAuthError,
} from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-form">
        <h2>Sign In</h2>

        <form [formGroup]="signinForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              formControlName="username"
              [class.error]="
                signinForm.get('username')?.invalid &&
                signinForm.get('username')?.touched
              "
            />
            <div
              class="error-message"
              *ngIf="
                signinForm.get('username')?.invalid &&
                signinForm.get('username')?.touched
              "
            >
              Username is required
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              [class.error]="
                signinForm.get('password')?.invalid &&
                signinForm.get('password')?.touched
              "
            />
            <div
              class="error-message"
              *ngIf="
                signinForm.get('password')?.invalid &&
                signinForm.get('password')?.touched
              "
            >
              Password is required
            </div>
          </div>

          <div class="error-message" *ngIf="error$ | async as error">
            {{ error }}
          </div>

          <button
            type="submit"
            [disabled]="signinForm.invalid || (loading$ | async)"
            class="submit-btn"
          >
            {{ (loading$ | async) ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>

        <p class="auth-link">
          Don't have an account? <a routerLink="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        background-color: var(--blue);
      }

      .auth-form {
        background: var(--white);
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      }

      h2 {
        text-align: center;
        margin-bottom: 2rem;
        color: var(--blue);
      }

      .form-group {
        margin-bottom: 1rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: var(--blue);
      }

      input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
        box-sizing: border-box;
      }

      input.error {
        border-color: #e74c3c;
      }

      .error-message {
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }

      .submit-btn {
        width: 100%;
        padding: 0.75rem;
        background-color: var(--yellow);
        color: var(--blue);
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 1rem;
        font-weight: 600;
      }

      .submit-btn:hover:not(:disabled) {
        background-color: var(--yellow);
        font-weight: 600;
      }

      .submit-btn:disabled {
        background-color: var(--yellow);
        cursor: not-allowed;
      }

      .auth-link {
        text-align: center;
        margin-top: 1rem;
      }

      .auth-link a {
        color: var(--blue);
        font-weight: 600;
        text-decoration: none;
      }

      .auth-link a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearError());
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      this.store.dispatch(
        AuthActions.signin({
          signinData: this.signinForm.value,
        })
      );
    }
  }
}
