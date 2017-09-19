import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  templateUrl: '500.component.html'
})
export class P500Component {

  constructor(
    private location: Location,
  ) { }

  goBack(): void {
    this.location.back();
  }
}
