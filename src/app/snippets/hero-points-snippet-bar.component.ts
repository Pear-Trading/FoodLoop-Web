import { Component, OnInit } from '@angular/core';
import { HeroPointsSnippetsService } from '../providers/hero-points-snippets.service';

@Component({
  selector: 'snippet-bar-hero-points',
  templateUrl: './hero-points-snippet-bar.component.html',
})

export class HeroPointsSnippetBarComponent implements OnInit {

  // Hero Points snippets
  public heroPointsSnippets = {
    avg_multi: 0,
    point_last: 0,
    points_total: 0,
    trans_count: 0,
  };

  constructor(
    private heroPointsSnippetsService: HeroPointsSnippetsService,
  ) { }

  public ngOnInit(): void {
    this.heroPointsSnippetsService.getHeroPointsSnippets()
      .subscribe(
        result => {
          this.heroPointsSnippets.avg_multi = result.snippets.avg_multi;
          this.heroPointsSnippets.point_last = result.snippets.point_last;
          this.heroPointsSnippets.points_total = result.snippets.points_total;
          this.heroPointsSnippets.trans_count = result.snippets.trans_count;
        }
      )
  }
}
