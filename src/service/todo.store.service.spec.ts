import { TodoStore } from './todo.store.service';
import { Todo } from '../models/todo.model';

describe('TodoStore', () => {
  let service: TodoStore;
  const todos = [];

  beforeEach(() => {
    service = new TodoStore();
    service.todos = todos;
  });

  it('check function getWithCompleted', () => {
    todos.push(new Todo('test'));
    spyOn(service.todos, 'filter');

    service.getWithCompleted(false);

    expect(service.todos.filter).toHaveBeenCalled();
  });

  it('check function allCompleted', () => {
    const getCompletedResultLength = service.getWithCompleted(false);

    service.allCompleted();

    expect(service.todos.length).toEqual(getCompletedResultLength.length);
  });

  it('check function setAllTo', () => {

    service.setAllTo(true);

    service.todos.forEach(item => {
      expect(item.completed).toEqual(true);
    });
  });

  it('check function removeCompleted', () => {
    const getWithCompletedResult = service.getWithCompleted(false);

    service.removeCompleted();

    expect(service.todos).toEqual(getWithCompletedResult);
  });

  it('check function getRemaining', () => {
    spyOn(service, 'getWithCompleted');

    service.getRemaining();

    expect(service.getWithCompleted).toHaveBeenCalledWith(false);
  });

  it('check function getCompleted', () => {
    spyOn(service, 'getWithCompleted');

    service.getCompleted();

    expect(service.getWithCompleted).toHaveBeenCalledWith(true);
  });

  it('check function toggleCompletion', () => {
    const todo = new Todo('test');

    service.toggleCompletion(todo);
  });

  it('check function remove', () => {
    const todo = new Todo('test');

    service.remove(todo);

    expect(service.todos.splice(service.todos.indexOf(todo), 1)).toEqual([]);
  });

  it('check function add', () => {
    const title = 'name';

    service.add(title);

    expect(service.todos).toContain(new Todo(title));
  });
});
