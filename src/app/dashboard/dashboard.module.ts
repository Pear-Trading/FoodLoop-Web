import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DashboardComponent } from './dashboard.component';
import { LeaderboardsComponent } from './leaderboards.component';
import { AccountEditComponent } from './account-edit.component';
import { AddDataComponent } from './add-data.component';

import { GraphWidget } from '../widgets/graph-widget.component';

import { DashboardRoutingModule } from './dashboard.routing';
import { OrgResultComponent } from '../shared/org-result.component';
import { OrgTableComponent } from '../shared/org-table.component';

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
    OrgResultComponent,
    OrgTableComponent,
    GraphWidget,
  ]
})
export class DashboardModule { }
