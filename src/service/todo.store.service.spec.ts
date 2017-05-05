import { TodoStore } from './todo.store.service';
import { Todo } from '../models/todo.model';

describe('TodoStore', () => {
  let service: TodoStore;
  const todos = [];

  beforeEach(() => {
    service = new TodoStore();
    service.todos = todos;
  });

  it('runtime coverage allCompleted', () => {
    service.allCompleted();
  });

  it('runtime coverage setAllTo', () => {
    const completed = true;

    service.todos.forEach(item => {
      expect(item.completed).toEqual(true);
    });

    service.setAllTo(true);
  });

});
