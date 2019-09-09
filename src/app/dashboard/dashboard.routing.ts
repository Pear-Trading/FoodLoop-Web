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
import { FeedbackComponent } from './feedback.component';
import { TransactionLogComponent } from './transaction-log.component';
import { CategoryMonthComponent } from './category-month.component';
import { PayrollLogComponent } from './payroll-log.component';
import { LeaderboardComponent } from './leaderboard.component';
import { MapComponent } from './map.component';
import { TrailMapComponent } from './trail-map.component';
import { MoreStuffComponent } from './more-graphs-and-tables.component';
import { SuppliersComponent } from './suppliers.component';

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
        data: { title: 'Edit Account' },
      },
      {
        path: 'add-data',
        component: AddDataComponent,
        data: { title: 'Add Transaction' },
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
        data: { title: 'Leaderboards' },
        canActivate: [CustomerGuard],
      },
      {
        path: 'transaction-log',
        component: TransactionLogComponent,
        data: { title: 'Transaction Log' },
      },
      {
        path: 'category-month',
        component: CategoryMonthComponent,
        data: { title: 'Budget' },
      },
      {
        path: 'map',
        component: MapComponent,
        data: { title: 'Purchase Map' },
      },
      {
        path: 'story-trail',
        component: TrailMapComponent,
        data: { title: 'Story Trail' },
      },
      {
        path: 'payroll-log',
        component: PayrollLogComponent,
        data: { title: 'Payroll Log' },
        canActivate: [OrgGuard],
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
        data: { title: 'Give Feedback' },
      },
      {
        path: 'suppliers',
        component: SuppliersComponent,
        data: { title: 'Suppliers' }
      },
      {
        path: 'more-graphs-and-tables',
        component: MoreStuffComponent,
        data: { title: 'Infographics'}
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
