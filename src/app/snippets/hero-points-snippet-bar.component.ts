import { Component, OnInit } from '@angular/core';
import { HeroPointsSnippetsService } from '../providers/hero-points-snippets.service';

@Component({
  selector: 'snippet-bar-hero-points',
  templateUrl: './hero-points-snippet-bar.component.html',
})

export class HeroPointsSnippetBarComponent implements OnInit {

  public pointTotal = 0;
  public pointLast = 0;
  public transCount = 0;
  public avgMulti = 0;

  constructor(
    private snippetsService: HeroPointsSnippetsService,
  ) { }

  public ngOnInit(): void {
    this.snippetsService.getPointsData()
      .subscribe(
        result => {
          this.pointTotal = result.snippets.point_total;
          this.pointLast = result.snippets.point_last;
          this.transCount = result.snippets.trans_count;
          this.avgMulti = result.snippets.avg_multi;
        }
      );
  }
}
