import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
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
import { LeaderboardComponent } from './leaderboard.component';
import { MapComponent } from './map.component';
import { TrailMapComponent } from './trail-map.component';
import { HeroPointsComponent } from './hero-points.component';

import { GraphWidget } from '../widgets/graph-widget.component';
import { OrgBarSnippetComponent } from '../snippets/org-snippet-bar.component';
import { CustBarSnippetComponent } from '../snippets/cust-snippet-bar.component';
//import { HeroPointsSnippetBarComponent } from '../snippets/hero-points-snippet-bar.component';
import { GraphPanel } from '../panels/graph-panel.component';
import { PiePanel } from '../panels/pie-panel.component';

import { DashboardRoutingModule } from './dashboard.routing';
import { OrgResultComponent } from '../shared/org-result.component';
import { OrgTableComponent } from '../shared/org-table.component';
import { TransactionResultComponent } from '../shared/transaction-result.component';
import { PayrollResultComponent } from '../shared/payroll-result.component';
import { LeaderboardResultComponent } from '../shared/leaderboard-result.component';

// API key env variable import
import { environment } from '../../environments/environment';

// Pipes
import { NgPipesModule } from 'ngx-pipes';

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
    NgPipesModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardCustomerComponent,
    AccountEditComponent,
    AddDataComponent,
    OrgResultComponent,
    OrgTableComponent,
    TransactionLogComponent,
    CategoryMonthComponent,
    TransactionResultComponent,
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
    //HeroPointsSnippetBarComponent,
    GraphPanel,
    PiePanel,
    HeroPointsComponent,
  ],
  providers: [
    CurrencyPipe,
    GoogleMapsAPIWrapper,
  ],
})
export class DashboardModule { }
