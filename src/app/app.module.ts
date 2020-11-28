import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing & Guard Module
import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './_guards/auth.guard';
import { OrgGuard } from './_guards/org.guard';
import { CustomerGuard } from './_guards/customer.guard';
import { ApiService } from './providers/api-service';

import { OrgGraphsService } from './providers/org-graphs.service';
import { CustGraphsService } from './providers/cust-graphs.service';
import { OrgSnippetsService } from './providers/org-snippets.service';
import { CustSnippetsService } from './providers/cust-snippets.service';
import { CustPiesService } from './providers/cust-pies.service';
import { OrgPiesService } from './providers/org-pies.service';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

// Error Pages
import { P404Component } from './pages/404.component';
import { P500Component } from './pages/500.component';

// Submodules
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ChartsModule } from 'ng2-charts';
// import { StackedBarChartComponent } from './panels/stacked-bar.component';
import { FilterPipeModule } from 'ngx-filter-pipe';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FilterPipeModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AuthModule,
    ChartsModule,
    DashboardModule,
    // Loaded last to allow for 404 catchall
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    // StackedBarChartComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    P404Component,
    P500Component,
  ],
  providers: [
    AuthGuard,
    OrgGuard,
    CustomerGuard,
    ApiService,
    OrgGraphsService,
    OrgSnippetsService,
    CustGraphsService,
    CustSnippetsService,
    CustPiesService,
    OrgPiesService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor (
    private api: ApiService,
  ) {
    this.api.checkDatabaseConnection().subscribe(
      result => {
      },
      error => {
        document.location = '#/500';
        throw new Error('Server connection fail');
      }
    );

    if (environment.enableAnalytics) {
      (<any>window).ga('create', environment.analyticsKey, 'auto');
    }
  }
}
