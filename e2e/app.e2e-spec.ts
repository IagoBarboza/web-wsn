import { NodePage } from './app.po';

describe('node App', () => {
  let page: NodePage;

  beforeEach(() => {
    page = new NodePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
