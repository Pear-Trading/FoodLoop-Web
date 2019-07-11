import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs';

@Injectable()
export class OrgPiesService {
  private orgPieUrl = '/v1/organisation/pies';

  constructor(private api: ApiService) { }

  public getOrgPie(): Observable<any> {
    return this.api.post(this.orgPieUrl);
  }
}
