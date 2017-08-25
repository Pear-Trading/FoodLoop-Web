import { LoginPageObject } from './login.po';

describe('Login Page', () => {
  let page: LoginPageObject;

  beforeEach(() => {
    page = new LoginPageObject();
  });

  it('should have a header saying login', () => {
    page.navigateTo();
    expect(page.getLoginHeaderText()).toEqual('Login');
  });
});
