import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  dataReceived: string = 'yes';

  markers = [
	  {
		  lat: 54.0466,
		  lng: -2.8007,
		  label: 'A',

	  },
	  {
      lat: 54.0453,
		  lng: -2.83,
		  label: 'B'
	  },
	  {
      lat: 54.0563,
		  lng: -2.8279,
		  label: 'C'
	  }
  ]

  map: any;

  constructor(
    private http: Http,
    private api: ApiService,
  ) { }

  ngOnInit(): void { }

  public onMapReady(map: any) {
    this.map = map;
  }

  public viewBoundsChanged() {
    console.log("finding bounds");
    const resp = this.map.getBounds();
    console.log("found bounds");
    console.log(resp.getNorthEast().lat());
    console.log(resp.getNorthEast().lng());
    console.log(resp.getSouthWest().lat());
    console.log(resp.getSouthWest().lng());
    const mapData = {
      north_east_lat: resp.getNorthEast().lat(),
      north_east_lng: resp.getNorthEast().lng(),
      south_west_lat: resp.getSouthWest().lat(),
      south_west_lng: resp.getSouthWest().lng()
    };
    this.api.getMapData(mapData).subscribe(
      result => {
        this.dataReceived = 'yes';
      },
      error => {
        // this.dataReceived = 'no';
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }



}
