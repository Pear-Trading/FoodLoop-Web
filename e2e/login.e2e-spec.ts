import { LoginPageObject } from './login.po';
import { browser } from 'protractor';

describe('Login Page', () => {
  let page: LoginPageObject;

  beforeEach(() => {
    page = new LoginPageObject();
    page.navigateTo();
  });

  it('should have a header saying login', () => {
    expect(page.getLoginHeaderText()).toEqual('Login');
  });

  it('should have a username box of type email', () => {
    expect(page.isEmailFieldPresent()).toBeTruthy();
    expect(page.getEmailFieldType()).toEqual('email');
  });

  it('should have a password box of type password', () => {
    expect(page.isPasswordFieldPresent()).toBeTruthy();
    expect(page.getPasswordFieldType()).toBe('password');
  });

  it('should have a login button of type submit', () => {
    expect(page.isLoginButtonPresent()).toBeTruthy();
    expect(page.getLoginButtonType()).toBe('submit');
  });

  it('should have a disabled login button when empty', () => {
    expect(page.isLoginButtonEnabled()).toBeFalsy();
  });

  it('should have a disabled login button when only email', () => {
    page.fillEmailFieldWith('test@example.com');
    expect(page.isLoginButtonEnabled()).toBeFalsy();
  });

  it('should have a disabled login button when only password', () => {
    page.fillPasswordFieldWith('abc123');
    expect(page.isLoginButtonEnabled()).toBeFalsy();
  });

  it('should have an enabled login button when both inputs filled', () => {
    page.fillEmailFieldWith('test@example.com');
    page.fillPasswordFieldWith('abc123');
    expect(page.isLoginButtonEnabled()).toBeTruthy();
  });

  it('should submit the filled data when login pressed', () => {
    page.fillEmailFieldWith('test@example.com');
    page.fillPasswordFieldWith('abc123');
    expect(page.isLoginButtonEnabled()).toBeTruthy();
    page.getLoginButton().click();
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain('dashboard');
  });
});
