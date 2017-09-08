import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  signin: FormGroup;
  returnUrl: string;
  loginStatus: any;

  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService
  ) {
    this.signin = this.formBuilder.group({
      email:    ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // reset login status
    this.api
    .logout()
    .subscribe(
      result => {
        console.log('Logged out!');
        localStorage.clear();
      }
    );

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    console.log(this.signin.value);

    this.api
    .login(this.signin.value)
    .subscribe(
      result => {
        console.log('logged in!');
        this.loginStatus = 'success';
        console.log(this.loginStatus);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log( error._body );
        this.loginStatus = 'send_failed';
        console.log(this.loginStatus);
      }
    );
  }
}
