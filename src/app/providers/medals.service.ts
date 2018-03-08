import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MedalsService {
  private medalsUrl = '/v1/user/medals';

  constructor(private api: ApiService) { }

  public getMedals(): Observable<any> {
    return this.api.post(this.medalsUrl);
    //return Observable.of()

  }
}
