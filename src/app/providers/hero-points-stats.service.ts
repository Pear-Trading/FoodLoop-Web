import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HeroPointsStatsService {
  private heroPointsStatsUrl = '/v1/user/points';

  constructor(private api: ApiService) { }

  public getHeroPointsStats(): Observable<any> {
    return this.api.post(this.heroPointsStatsUrl);
  }
}
