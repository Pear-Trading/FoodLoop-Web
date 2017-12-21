import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CustPiesService {
  private custPieUrl = '/v1/customer/pies';

  constructor(private api: ApiService) { }

  public getPie(): Observable<any> {
    return this.api.post(this.custPieUrl);
  }
}
