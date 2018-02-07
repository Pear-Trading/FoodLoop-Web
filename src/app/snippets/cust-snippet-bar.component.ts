import { Component, OnInit } from '@angular/core';
import { CustSnippetsService } from '../providers/cust-snippets.service';

@Component({
  selector: 'snippet-bar-cust',
  templateUrl: 'cust-snippet-bar.component.html',
})

export class CustBarSnippetComponent implements OnInit {

  public userSum = 0;
  public userPosition = 0;

  constructor(
    private snippetsService: CustSnippetsService,
  ) { }

  public ngOnInit(): void {
    this.snippetsService.getData()
      .subscribe(
        result => {
          this.userSum = result.snippets.user_sum;
          this.userPosition = result.snippets.user_position;
        }
      );
  }
}
