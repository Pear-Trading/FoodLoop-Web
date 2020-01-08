import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginPageObject } from './login.po';
import { ApiService } from '../src/app/providers/api-service';

describe('Login Page', () => {
  let page: LoginPageObject;
  let api: ApiService;
  let apiSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    page = new LoginPageObject();
    const spy = jasmine.createSpyObj
    TestBed.configureTestingModule({ providers: [ApiService] });
  });

  api = TestBed.get(ApiService);
  apiSpy = TestBed.get(ApiService);

  it('should have a header saying login', () => {
    expect(page.getLoginHeaderText()).toEqual('Login');
  });

  it('should have a username box of type email', () => {
    expect(page.isUsernameFieldPresent()).toBeTruthy();
    expect(page.getUsernameFieldType()).toEqual('email');
  });

  it('should have a password box of type password', () => {
    expect(page.isPasswordFieldPresent()).toBeTruthy();
    expect(page.getPasswordFieldType()).toBe('password');
  });
});
