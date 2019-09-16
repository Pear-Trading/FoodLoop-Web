import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs';

@Injectable()
export class CustSnippetsService {
  private custSnippetsUrl = '/v1/customer/snippets';

  constructor(private api: ApiService) { }

  // This endpoint should mimic basicStats
  public getData(): Observable<any> {
    return this.api.post(this.custSnippetsUrl);
  }
}
