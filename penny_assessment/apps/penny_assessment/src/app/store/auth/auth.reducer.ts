import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../models/auth.model';
import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  // Signup
  on(AuthActions.signup, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.signupSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    error: null,
  })),

  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Signin
  on(AuthActions.signin, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.signinSuccess, (state, { authResponse }) => ({
    ...state,
    user: authResponse.user,
    token: authResponse.token || null,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),

  on(AuthActions.signinFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Signout
  on(AuthActions.signout, (state) => ({
    ...state,
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
  })),

  // Load User from Storage
  on(AuthActions.loadUserFromStorage, (state) => {
    const userJson = localStorage.getItem('auth_user');
    const token = localStorage.getItem('auth_token');
    const user = userJson ? JSON.parse(userJson) : null;

    return {
      ...state,
      user,
      token,
      isAuthenticated: !!user && !!token,
    };
  }),

  // Clear Error
  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
