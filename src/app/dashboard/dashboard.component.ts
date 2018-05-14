import { Component } from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import { GraphWidget } from '../widgets/graph-widget.component';
import { OrgBarSnippetComponent } from '../snippets/org-snippet-bar.component';
import { GraphPanel } from '../panels/graph-panel.component';
import { DataType } from '../shared/data-types.enum';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

  public widgetList = [
    {
      type: 'graph',
      name: 'customers_last_7_days',
      icon: 'icon-people',
      title: 'Customers Last 7 Days',
    },
    {
      type: 'graph',
      name: 'customers_last_30_days',
      icon: 'icon-people',
      title: 'Customers Last 30 Days',
    },
    {
      type: 'graph',
      name: 'sales_last_7_days',
      icon: 'icon-diamond',
      title: 'Sales Last 7 Days',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'sales_last_30_days',
      icon: 'icon-diamond',
      title: 'Sales Last 30 Days',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'purchases_last_7_days',
      title: 'Purchases Last 7 Days',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'purchases_last_30_days',
      title: 'Purchases Last 30 Days',
      dataType: DataType.currency,
    },
  ];
  constructor(private router: Router) {
    if (environment.enableAnalytics) {
       this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          (<any>window).ga('send', 'pageview');
        }
      });
    }
  }
}
