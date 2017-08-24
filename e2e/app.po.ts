import { browser, element, by } from 'protractor';

export class CoreUIPage {
  navigateTo() {
    return browser.get('/');
  }

  getLoginHeaderText() {
    return element(by.css('app-root h1')).getText();
  }
}
