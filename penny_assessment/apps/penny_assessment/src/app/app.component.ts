import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth/auth.actions';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'penny_assessment';

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Load user from storage on app initialization
    this.store.dispatch(AuthActions.loadUserFromStorage());
  }
}
