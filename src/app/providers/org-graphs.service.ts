import { Injectable } from '@angular/core';
import { ApiService } from './api-service';

@Injectable()
export class OrgGraphsService {
  private orgGraphUrl = '/v1/customer/graphs';

  constructor(private api: ApiService) { }

  public getGraph(name: string, data: any = {}) {
    data.graph = name;
    return this.api.post(this.orgGraphUrl, data);
  }
}
