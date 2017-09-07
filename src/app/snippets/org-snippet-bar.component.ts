import { Component, OnInit } from '@angular/core';
import { OrgSnippetsService } from '../providers/org-snippets.service';

@Component({
  selector: 'snippet-bar-org',
  templateUrl: 'org-snippet-bar.component.html',
})
export class OrgBarSnippetComponent implements OnInit {

  public thisMonthSalesCount = 0;
  public thisMonthSalesTotal = 0;
  public thisWeekSalesCount = 0;
  public thisWeekSalesTotal = 0;
  public todaySalesCount = 0;
  public todaySalesTotal = 0;

  public thisMonthPurchasesCount = 0;
  public thisMonthPurchasesTotal = 0;
  public thisWeekPurchasesCount = 0;
  public thisWeekPurchasesTotal = 0;
  public todayPurchasesCount = 0;
  public todayPurchasesTotal = 0;

  constructor(
    private snippetsService: OrgSnippetsService,
  ) { }

  public ngOnInit(): void {
    this.snippetsService.getData()
      .subscribe(
        result => {
          this.thisMonthSalesCount = result.snippets.this_month_sales_count;
          this.thisMonthSalesTotal = result.snippets.this_month_sales_total;
          this.thisWeekSalesCount  = result.snippets.this_week_sales_count;
          this.thisWeekSalesTotal  = result.snippets.this_week_sales_total;
          this.todaySalesCount     = result.snippets.today_sales_count;
          this.todaySalesTotal     = result.snippets.today_sales_total;

          this.thisMonthPurchasesCount = result.snippets.this_week_purchases_count;
          this.thisMonthPurchasesTotal = result.snippets.this_week_purchases_total;
          this.thisWeekPurchasesCount  = result.snippets.this_month_purchases_count;
          this.thisWeekPurchasesTotal  = result.snippets.this_month_purchases_total;
          this.todayPurchasesCount     = result.snippets.today_purchases_count;
          this.todayPurchasesTotal     = result.snippets.today_purchases_total;
        }
      );
  }
}
