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
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-form">
        <h2>Sign Up</h2>

        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              formControlName="username"
              [class.error]="
                signupForm.get('username')?.invalid &&
                signupForm.get('username')?.touched
              "
            />
            <div
              class="error-message"
              *ngIf="
                signupForm.get('username')?.invalid &&
                signupForm.get('username')?.touched
              "
            >
              Username is required
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              [class.error]="
                signupForm.get('email')?.invalid &&
                signupForm.get('email')?.touched
              "
            />
            <div
              class="error-message"
              *ngIf="
                signupForm.get('email')?.invalid &&
                signupForm.get('email')?.touched
              "
            >
              Valid email is required
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              [class.error]="
                signupForm.get('password')?.invalid &&
                signupForm.get('password')?.touched
              "
            />
            <div
              class="error-message"
              *ngIf="
                signupForm.get('password')?.invalid &&
                signupForm.get('password')?.touched
              "
            >
              Password must be at least 6 characters
            </div>
          </div>

          <div class="form-group">
            <label for="firstName">First Name (Optional)</label>
            <input type="text" id="firstName" formControlName="firstName" />
          </div>

          <div class="form-group">
            <label for="lastName">Last Name (Optional)</label>
            <input type="text" id="lastName" formControlName="lastName" />
          </div>

          <div class="error-message" *ngIf="error$ | async as error">
            {{ error }}
          </div>

          <button
            type="submit"
            [disabled]="signupForm.invalid || (loading$ | async)"
            class="submit-btn"
          >
            {{ (loading$ | async) ? 'Signing Up...' : 'Sign Up' }}
          </button>
        </form>

        <p class="auth-link">
          Already have an account? <a routerLink="/signin">Sign in here</a>
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
        background-color: #f5f5f5;
      }

      .auth-form {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      }

      h2 {
        text-align: center;
        margin-bottom: 2rem;
        color: #333;
      }

      .form-group {
        margin-bottom: 1rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #555;
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
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 1rem;
      }

      .submit-btn:hover:not(:disabled) {
        background-color: #218838;
      }

      .submit-btn:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
      }

      .auth-link {
        text-align: center;
        margin-top: 1rem;
      }

      .auth-link a {
        color: #007bff;
        text-decoration: none;
      }

      .auth-link a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: [''],
      lastName: [''],
    });

    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearError());
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
      const signupData = {
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
        ...(formValue.firstName && { firstName: formValue.firstName }),
        ...(formValue.lastName && { lastName: formValue.lastName }),
      };

      this.store.dispatch(AuthActions.signup({ signupData }));
    }
  }
}
