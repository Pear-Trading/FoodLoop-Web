import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DashboardComponent } from './dashboard.component';
import { LeaderboardsComponent } from './leaderboards.component';
import { AccountEditComponent } from './account-edit.component';
import { AddDataComponent } from './add-data.component';

import { Customer7DayWidget } from '../widgets/customers.component';

import { DashboardRoutingModule } from './dashboard.routing';

@NgModule({
  imports: [
    // Angular imports
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    BsDropdownModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    LeaderboardsComponent,
    AccountEditComponent,
    AddDataComponent,
    Customer7DayWidget,
  ]
})
export class DashboardModule { }
