import { LoginPageObject } from './login.po';

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
    expect(page.isUsernameFieldPresent()).toBeTruthy();
    expect(page.getUsernameFieldType()).toEqual('email');
  });

  it('should have a password box of type password', () => {
    expect(page.isPasswordFieldPresent()).toBeTruthy();
    expect(page.getPasswordFieldType()).toBe('password');
  });
});
