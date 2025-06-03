import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { User } from '../../models/auth.model';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Welcome to Penny Assessment</h1>
        <div class="user-info" *ngIf="currentUser$ | async as user">
          <span>Hello, {{ user.firstName || user.username }}!</span>
          <button (click)="signout()" class="signout-btn">Sign Out</button>
        </div>
      </header>

      <main class="dashboard-content">
        <div class="user-card" *ngIf="currentUser$ | async as user">
          <h2>User Profile</h2>
          <div class="user-details">
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p *ngIf="user.firstName">
              <strong>First Name:</strong> {{ user.firstName }}
            </p>
            <p *ngIf="user.lastName">
              <strong>Last Name:</strong> {{ user.lastName }}
            </p>
            <p>
              <strong>Account Status:</strong>
              <span
                [class]="user.isActive ? 'status-active' : 'status-inactive'"
              >
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </span>
            </p>
            <p>
              <strong>Member Since:</strong>
              {{ user.createdAt | date : 'medium' }}
            </p>
          </div>
        </div>

        <div class="info-card">
          <h2>Session Information</h2>
          <p>
            You are signed in and your session will automatically expire after 8
            hours of inactivity.
          </p>
          <p>
            You can sign out manually at any time using the "Sign Out" button
            above.
          </p>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        min-height: 100vh;
        background-color: var(--white);
      }

      .dashboard-header {
        background-color: var(--blue);
        color: var(--white);
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .dashboard-header h1 {
        margin: 0;
        font-size: 1.5rem;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .signout-btn {
        background-color: var(--yellow);
        color: var(--blue);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 600;
      }

      .signout-btn:hover {
        background-color: var(--yellow);
        transform: scale(1.05);
      }

      .dashboard-content {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .user-card,
      .info-card {
        background: var(--white);
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
        border: 1px solid #e0e0e0;
      }

      .user-card h2,
      .info-card h2 {
        margin-top: 0;
        color: var(--blue);
        border-bottom: 2px solid var(--yellow);
        padding-bottom: 0.5rem;
      }

      .user-details p {
        margin: 0.75rem 0;
        font-size: 1rem;
        color: var(--blue);
      }

      .status-active {
        color: var(--yellow);
        font-weight: 600;
      }

      .status-inactive {
        color: #dc3545;
        font-weight: 600;
      }

      @media (max-width: 768px) {
        .dashboard-header {
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }

        .dashboard-content {
          padding: 1rem;
        }
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<User | null>;

  constructor(private store: Store) {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  ngOnInit(): void {
    // Load user from storage when component initializes
    this.store.dispatch(AuthActions.loadUserFromStorage());
  }

  signout(): void {
    this.store.dispatch(AuthActions.signout());
  }
}
