import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { CurrencyPipe } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardCustomerComponent } from './dashboard-customer.component';
import { AccountEditComponent } from './account-edit.component';
import { AddDataComponent } from './add-data.component';
import { FeedbackComponent } from './feedback.component';
import { TransactionLogComponent } from './transaction-log.component';
import { PayrollLogComponent } from './payroll-log.component';
import { LeaderboardComponent } from './leaderboard.component';
import { MapComponent } from './map.component';
import { TrailMapComponent } from './trail-map.component';
import { TrailMapComponent2 } from './trail-map-2.component';

import { GraphWidget } from '../widgets/graph-widget.component';
import { OrgBarSnippetComponent } from '../snippets/org-snippet-bar.component';
import { GraphPanel } from '../panels/graph-panel.component';

import { DashboardRoutingModule } from './dashboard.routing';
import { OrgResultComponent } from '../shared/org-result.component';
import { OrgTableComponent } from '../shared/org-table.component';
import { TransactionResultComponent } from '../shared/transaction-result.component';
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
    AgmSnazzyInfoWindowModule,
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
    PayrollLogComponent,
    PayrollResultComponent,
    LeaderboardComponent,
    LeaderboardResultComponent,
    MapComponent,
    TrailMapComponent,
    TrailMapComponent2,
    FeedbackComponent,
    GraphWidget,
    OrgBarSnippetComponent,
    GraphPanel,
  ],
  providers: [
    CurrencyPipe,
    GoogleMapsAPIWrapper,
  ],
})
export class DashboardModule { }
