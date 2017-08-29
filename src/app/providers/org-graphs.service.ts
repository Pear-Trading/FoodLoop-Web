import { Injectable } from '@angular/core';
import { ApiService } from './api-service';

@Injectable()
export class OrgGraphsService {
  private orgGraphUrl = '/v1/organisation/graphs';

  constructor(private api: ApiService) { }

  public getGraph(name: string) {
    return this.api.post(this.orgGraphUrl, { graph: name });
  }
}
