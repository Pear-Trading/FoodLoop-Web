import { CoreUIPage } from './app.po';

describe('LocalLoop App', () => {
  let page: CoreUIPage;

  beforeEach(() => {
    page = new CoreUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getLoginHeaderText()).toEqual('Login');
  });
});
