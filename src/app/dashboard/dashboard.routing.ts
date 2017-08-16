import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard';

import { DashboardComponent } from './dashboard.component';
import { LeaderboardsComponent } from './leaderboards.component';
import { FullLayoutComponent } from '../layouts/full-layout.component';
import { AccountEditComponent } from './account-edit.component';
import { AddDataComponent } from './add-data.component';

// Using child path to allow for FullLayout theming
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
      },
      {
        path: 'leaderboards',
        component: LeaderboardsComponent,
        data: { title: 'Leaderboards' },
      },
      {
        path: 'account-edit',
        component: AccountEditComponent,
        data: { title: 'Leaderboards' },
      },
      {
        path: 'add-data',
        component: AddDataComponent,
        data: { title: 'Add Transaction' },
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
