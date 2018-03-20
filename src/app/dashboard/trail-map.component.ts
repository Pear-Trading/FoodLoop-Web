import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { AgmCoreModule } from '@agm/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'trail-map.component.html',
})
export class TrailMapComponent implements OnInit, AfterViewInit {
  @ViewChild('statusModal') myStatusModal: ModalDirective;
  lat: number = 54.0466;
  lng: number = -2.8007;
  zoom: number = 12;
  public modalRef: BsModalRef;
  public modalRef2: BsModalRef;
  clickedMarker: any;
  assocMap = 'lis';
  assocLogo: string;

  dataReceived: string = 'loading';

  markers: Array<{latitude: number, longitude: number, name: string}>;

  map: any;

  constructor(
    private api: ApiService,
    private modalService: BsModalService,
  ) {
    this.assocLogo = 'assets/img/association/' + this.assocMap + '-logo.png';
  }

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

  openModalAssoc(templateAssoc: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(templateAssoc);
  }

  public onMarkerClick(clickedMarker, template: TemplateRef<any>) {
    this.clickedMarker = clickedMarker;
    this.assocLogo = 'assets/img/association/' + this.assocMap + '-logo.png';
    this.openModal(template);
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
      association: this.assocMap,
    }
    this.api.getAssocData(mapData).subscribe(
      result => {
        this.myStatusModal.hide();
        this.markers = result.locations;
      },
      error => {
        this.dataReceived = 'no';
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }



}
