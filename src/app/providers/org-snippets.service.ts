import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class OrgSnippetsService {
  private orgSnippetsUrl = '/v1/organisation/snippets';

  constructor(private api: ApiService) { }

  public getData(): Observable<any> {
    return Observable.of(
      {
        'customersthismonth' : 196,
        'moneyspentthismonth' : 156.02,
        'pointstotal' : 506,
        'averagetransactiontoday' : 3.69
      }
    );
  }
}
