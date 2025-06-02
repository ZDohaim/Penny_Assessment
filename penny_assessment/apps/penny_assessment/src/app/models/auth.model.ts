export interface User {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SignupDto {
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

export interface SigninDto {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
