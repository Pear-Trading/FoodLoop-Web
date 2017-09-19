import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  templateUrl: '404.component.html'
})
export class P404Component {

  constructor(
    private location: Location,
  ) { }

  goBack(): void {
    this.location.back();
  }
}
