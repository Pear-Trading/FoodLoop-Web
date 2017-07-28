import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [ApiService]
})
export class FullLayoutComponent implements OnInit {
  customersThisMonth: any;
  moneySpentThisMonth: any;
  pointsTotal: any;
  averageTransactionToday: any;
  displayName: any;
  
  constructor(
  private api: ApiService,
  private router: Router,
  ) {
    /* this.api.breadcrumb_data(undefined)
    .subscribe(
      result => { 
        console.log(result);
        this.customersThisMonth = result.customersthismonth;
        this.moneySpentThisMonth = result.moneyspentthismonth;
        this.pointsTotal = result.pointstotal;
        this.averageTransactionToday = result.averagetransactiontoday;
      }
    ) */
  }
  
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

  // getDisplayName function from api didnt work
  ngOnInit(): void {
    this.displayName = localStorage.getItem('displayname') || 'User';
  }
  
  userLogout() {
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