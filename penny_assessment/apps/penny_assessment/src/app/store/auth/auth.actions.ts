import { createAction, props } from '@ngrx/store';
import {
  User,
  SignupDto,
  SigninDto,
  AuthResponse,
} from '../../models/auth.model';

// Signup Actions
export const signup = createAction(
  '[Auth] Signup',
  props<{ signupData: SignupDto }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: User }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);

// Signin Actions
export const signin = createAction(
  '[Auth] Signin',
  props<{ signinData: SigninDto }>()
);

export const signinSuccess = createAction(
  '[Auth] Signin Success',
  props<{ authResponse: AuthResponse }>()
);

export const signinFailure = createAction(
  '[Auth] Signin Failure',
  props<{ error: string }>()
);

// Signout Action
export const signout = createAction('[Auth] Signout');

// Load User from Storage
export const loadUserFromStorage = createAction(
  '[Auth] Load User From Storage'
);

// Clear Error
export const clearError = createAction('[Auth] Clear Error');
