import { Component, OnInit } from '@angular/core';
import { OrgSnippetsService } from '../providers/org-snippets.service';

@Component({
  selector: 'snippet-bar-org',
  templateUrl: 'org-snippet-bar.component.html',
})
export class OrgBarSnippetComponent implements OnInit {

  public customersThisMonth = 0;
  public moneySpentThisMonth = 0;
  public pointsTotal = 0;
  public averageTransactionToday = 0;

  constructor(
    private snippetsService: OrgSnippetsService,
  ) { }

  public ngOnInit(): void {
    this.snippetsService.getData()
      .subscribe(
        result => {
          this.customersThisMonth = result.snippets.this_month_customer_count;
          this.moneySpentThisMonth = result.snippets.this_month_customer_spend;
          this.pointsTotal = result.snippets.pear_points_total;
          this.averageTransactionToday = result.snippets.today_sales_average;
        }
      );
  }
}
