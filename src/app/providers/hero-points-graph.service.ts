import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HeroPointsGraphService {
  private heroPointsGraphUrl = '/v1/user/points';

  constructor(private api: ApiService) { }

  // This endpoint should mimic basicStats
  public getHeroPointsGraph(): Observable<any> {
    return this.api.post(this.heroPointsGraphUrl);
  }
}
