import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { AgmCoreModule } from '@agm/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  templateUrl: 'map.component.html',
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('statusModal', { static: true }) myStatusModal: ModalDirective;
  lat = 54.0466;
  lng = -2.8007;
  zoom = 12;
  public modalRef: BsModalRef;
  clickedMarker: any;

  dataReceived = 'loading';

  markers: Array<{latitude: number, longitude: number, name: string}>;

  map: any;

  constructor(
    private api: ApiService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.myStatusModal.show();
  }

  public onMapReady(map: any) {
    this.map = map;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public onMarkerClick(clickedMarker, template: TemplateRef<any>) {
    console.log(clickedMarker);
    this.clickedMarker = clickedMarker;
    this.openModal(template);
  }

  public viewBoundsChanged() {
    console.log('finding bounds');
    const resp = this.map.getBounds();
    console.log('found bounds');
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
        this.myStatusModal.hide();
        this.markers = result.suppliers;
      },
      error => {
        this.dataReceived = 'no';
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }



}
