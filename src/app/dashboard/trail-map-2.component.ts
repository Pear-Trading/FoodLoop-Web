import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { AgmCoreModule } from '@agm/core';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'trail-map-2.component.html',
})
export class TrailMapComponent2 implements OnInit {

  lat: number = 54.0466;
  lng: number = -2.8007;
  zoom: number = 12;

  dataReceived: string = 'yes';

  markers: Array<{latitude: number, longitude: number, name: string}>;

  map: any;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void { }

  public onMapReady(map: any) {
    this.map = map;
  }

  public onMarkerClick(clickedMarker) {
    console.log(clickedMarker);
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
      north_east: {
        latitude:  resp.getNorthEast().lat(),
        longitude: resp.getNorthEast().lng()
      },
      south_west: {
        latitude:  resp.getSouthWest().lat(),
        longitude: resp.getSouthWest().lng()
      },
    }
    this.api.getMapData(mapData).subscribe(
      result => {
        this.dataReceived = 'yes';
        this.markers = result.suppliers;
      },
      error => {
        // this.dataReceived = 'no';
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }



}
