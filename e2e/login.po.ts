import { browser, element, by } from 'protractor';

export class LoginPageObject {
  navigateTo() {
    return browser.get('/login');
  }

  getLoginHeaderText() {
    return element(by.css('app-root h1')).getText();
  }

  getUsernameField() { return element(by.id('username')); }
  getPasswordField() { return element(by.id('password')); }

  isUsernameFieldPresent() { return this.getUsernameField().isPresent(); }
  isPasswordFieldPresent() { return this.getPasswordField().isPresent(); }

  getUsernameFieldType() { return this.getUsernameField().getAttribute('type'); }
  getPasswordFieldType() { return this.getPasswordField().getAttribute('type'); }
}
