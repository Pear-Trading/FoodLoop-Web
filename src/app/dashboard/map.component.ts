import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
import { AgmCoreModule } from '@agm/core';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'map.component.html',
})
export class MapComponent implements OnInit {

  lat: number = 54.0466;
  lng: number = -2.8007;
  zoom: number = 12;

  constructor(
    private http: Http,
    private api: ApiService,
  ) { }

  ngOnInit(): void {

  }

}
