import { browser, element, by } from 'protractor';

export class LoginPageObject {
  navigateTo() {
    return browser.get('/login');
  }

  getLoginHeaderText() {
    return element(by.css('app-root h1')).getText();
  }

  getEmailField() { return element(by.id('username')); }
  getPasswordField() { return element(by.id('password')); }
  getLoginButton() { return element(by.id('login')); }

  isEmailFieldPresent() { return this.getEmailField().isPresent(); }
  isPasswordFieldPresent() { return this.getPasswordField().isPresent(); }
  isLoginButtonPresent() { return this.getLoginButton().isPresent(); }

  getEmailFieldType() { return this.getEmailField().getAttribute('type'); }
  getPasswordFieldType() { return this.getPasswordField().getAttribute('type'); }
  getLoginButtonType() { return this.getLoginButton().getAttribute('type'); }

  isLoginButtonEnabled() { return this.getLoginButton().isEnabled(); }

  clearEmailField() { return this.getEmailField().clear() };
  clearPasswordField() { return this.getPasswordField().clear() };

  fillEmailFieldWith(text) { return this.getEmailField().sendKeys(text) };
  fillPasswordFieldWith(text) { return this.getPasswordField().sendKeys(text) };
}
