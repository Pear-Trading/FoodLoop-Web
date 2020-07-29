import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmMarkerCluster } from '@agm/markerclusterer';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CurrencyPipe } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardCustomerComponent } from './dashboard-customer.component';
import { AccountEditComponent } from './account-edit.component';
import { AddDataComponent } from './add-data.component';
import { FeedbackComponent } from './feedback.component';
import { TransactionLogComponent } from './transaction-log.component';
import { CategoryMonthComponent } from './category-month.component';
import { PayrollLogComponent } from './payroll-log.component';
import { SuppliersComponent } from './suppliers.component';
import { MoreStuffComponent } from './more-graphs-and-tables.component';
import { LeaderboardComponent } from './leaderboard.component';
import { MapComponent } from './map.component';
import { TrailMapComponent } from './trail-map.component';

import { GraphWidget } from '../widgets/graph-widget.component';
import { OrgBarSnippetComponent } from '../snippets/org-snippet-bar.component';
import { CustBarSnippetComponent } from '../snippets/cust-snippet-bar.component';
import { GraphPanel } from '../panels/graph-panel.component';
import { BubbleChartComponent } from '../panels/bubble-panel.component';
import { PiePanel } from '../panels/pie-panel.component';
import { OrgPiePanel } from '../panels/org-pie-panel.component';

import { DashboardRoutingModule } from './dashboard.routing';
import { OrgResultComponent } from '../shared/org-result.component';
import { OrgTableComponent } from '../shared/org-table.component';
import { RecurResultComponent } from '../shared/recur-result.component';
import { RecurTableComponent } from '../shared/recur-table.component';
import { TransactionResultComponent } from '../shared/transaction-result.component';
import { SupplierResultComponent } from '../shared/supplier-result.component';
import { WardResultComponent } from '../shared/ward-result.component';
import { MetaTypeResultComponent } from '../shared/meta-type-result.component';
import { PayrollResultComponent } from '../shared/payroll-result.component';
import { LeaderboardResultComponent } from '../shared/leaderboard-result.component';

// API key env variable import
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    // Angular imports
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey
    }),
    AgmJsMarkerClustererModule,
    BsDropdownModule,
    NgxPaginationModule,
    DashboardRoutingModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    DashboardCustomerComponent,
    AccountEditComponent,
    AddDataComponent,
    OrgResultComponent,
    OrgTableComponent,
    RecurResultComponent,
    RecurTableComponent,
    TransactionLogComponent,
    CategoryMonthComponent,
    TransactionResultComponent,
    SupplierResultComponent,
    WardResultComponent,
    MetaTypeResultComponent,
    PayrollLogComponent,
    PayrollResultComponent,
    LeaderboardComponent,
    LeaderboardResultComponent,
    MapComponent,
    TrailMapComponent,
    FeedbackComponent,
    GraphWidget,
    OrgBarSnippetComponent,
    CustBarSnippetComponent,
    GraphPanel,
    PiePanel,
    OrgPiePanel,
    BubbleChartComponent,
    SuppliersComponent,
    MoreStuffComponent,
  ],
  providers: [
    CurrencyPipe,
    GoogleMapsAPIWrapper,
  ],
})
export class DashboardModule { }
