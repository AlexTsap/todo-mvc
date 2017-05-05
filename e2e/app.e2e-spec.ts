import { TodoMvcPage } from './app.po';

describe('todo-mvc App', () => {
  let page: TodoMvcPage;

  beforeEach(() => {
    page = new TodoMvcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
