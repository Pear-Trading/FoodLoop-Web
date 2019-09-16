import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs';

@Injectable()
export class OrgSnippetsService {
  private orgSnippetsUrl = '/v1/organisation/snippets';

  constructor(private api: ApiService) { }

  public getData(): Observable<any> {
    return this.api.post(this.orgSnippetsUrl);
  }
}
