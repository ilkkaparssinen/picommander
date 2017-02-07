import { PicommanderPage } from './app.po';

describe('picommander App', function() {
  let page: PicommanderPage;

  beforeEach(() => {
    page = new PicommanderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
