import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
})
export class FullLayoutComponent implements OnInit {
  public displayName: string;
  public accountType: any;
  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

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
    this.accountType = localStorage.getItem('usertype');
  }

  userLogout() {
    console.log('logout clicked');
    this.api
    .logout()
    .subscribe(
      result => {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    );
  }
}
