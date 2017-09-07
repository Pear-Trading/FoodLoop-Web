import { Component, OnInit } from '@angular/core';
import { OrgSnippetsService } from '../providers/org-snippets.service';

@Component({
  selector: 'snippet-bar-org',
  templateUrl: 'org-snippet-bar.component.html',
})
export class OrgBarSnippetComponent implements OnInit {

  public customersThisMonth: number;
  public moneySpentThisMonth: number;
  public pointsTotal: number;
  public averageTransactionToday: number;

  constructor(
    private snippetsService: OrgSnippetsService,
  ) { }

  public ngOnInit(): void {
    this.snippetsService.getData()
      .subscribe(
        result => {
          this.customersThisMonth = result.customersthismonth;
          this.moneySpentThisMonth = result.moneyspentthismonth;
          this.pointsTotal = result.pointstotal;
          this.averageTransactionToday = result.averagetransactiontoday;
        }
      );
  }
}
