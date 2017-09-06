import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

import { DashboardComponent } from './dashboard.component';
import { DashboardCustomerComponent } from './dashboard-customer.component';
import { AccountEditComponent } from './account-edit.component';
import { AddDataComponent } from './add-data.component';
import { FeedbackComponent } from './feedback.component';
import { TransactionLogComponent } from './transaction-log.component';

import { GraphWidget } from '../widgets/graph-widget.component';

import { DashboardRoutingModule } from './dashboard.routing';
import { OrgResultComponent } from '../shared/org-result.component';
import { OrgTableComponent } from '../shared/org-table.component';
import { TransactionResultComponent } from '../shared/transaction-result.component';

@NgModule({
  imports: [
    // Angular imports
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    BsDropdownModule,
    NgxPaginationModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardCustomerComponent,
    AccountEditComponent,
    AddDataComponent,
    OrgResultComponent,
    OrgTableComponent,
    TransactionLogComponent,
    TransactionResultComponent,
    FeedbackComponent,
    GraphWidget,
  ]
})
export class DashboardModule { }
