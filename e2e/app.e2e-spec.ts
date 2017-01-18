import { ReportFrontPage } from './app.po';

describe('report-front App', function() {
  let page: ReportFrontPage;

  beforeEach(() => {
    page = new ReportFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
