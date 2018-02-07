import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HeroPointsSnippetsService {
  private heroPointsSnippetsUrl = '/v1/user/points';

  constructor(private api: ApiService) { }

  // This endpoint should mimic basicStats
  public getPointsData(): Observable<any> {
    return this.api.post(this.heroPointsSnippetsUrl);
  }
}
