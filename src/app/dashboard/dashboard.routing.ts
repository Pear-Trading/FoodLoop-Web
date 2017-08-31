import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard';
import { OrgGuard } from '../_guards/org.guard';
import { CustomerGuard } from '../_guards/customer.guard';

import { DashboardComponent } from './dashboard.component';
import { DashboardCustomerComponent } from './dashboard-customer.component';
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
        canActivate: [OrgGuard],
      },
      {
        path: 'dashboard-customer',
        component: DashboardCustomerComponent,
        data: { title: 'Customer Dashboard' },
        canActivate: [CustomerGuard],
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
