import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [ApiService]
})
export class FullLayoutComponent implements OnInit {
  constructor(
  private api: ApiService,
  private router: Router,
  ) {}
  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {}
  
  userlogout() {
	console.log('logout clicked');
	this.api
	  .logout()
	  .subscribe(
		result => {
		  console.log('Logged out!');
		  window.location.reload();
		}
	  );
  }
}