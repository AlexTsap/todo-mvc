import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Todo } from '../models/todo.model';
import { TodoStore } from '../service/todo.store.service';
import { TodoComponent } from './app.component';

describe('check TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todoStore: TodoStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        TodoStore
      ]
    });

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;

    todoStore = TestBed.get(TodoStore);
    todoStore.todos = [new Todo('name')];
  }));

  it('check function removeCompleted', () => {
    spyOn(component.todoStore, 'removeCompleted');

    component.removeCompleted();

    expect(component.todoStore.removeCompleted).toHaveBeenCalled();
  });

  it('check function stopEditing', () => {
    const editingTitle = 'name';
    const testTodo = new Todo('nameTest');

    component.stopEditing(testTodo, editingTitle);

    expect(testTodo.title).toEqual('name');
    expect(testTodo.editing).toEqual(false);
  });

  it('check function cancelEditing', () => {
    const testTodo = new Todo('name');

    component.cancelEditingTodo(testTodo);

    expect(testTodo.editing).toEqual(false);
  });

  it('check function updateEditing with parameters: Todo, editedTitle.length > 0', () => {
    const testTodo = new Todo('nameTest');
    const testTitle = 'name';

    component.updateEditingTodo(testTodo, testTitle);

    expect(testTodo.title).toEqual('name');
    expect(testTitle).toEqual(testTitle.trim());
    expect(testTodo.editing).toEqual(false);
  });

  it('check function updateEditing with parameters: Todo, title.length === 0', () => {
    const testTodo = new Todo('name');
    const testTitle = '';

    spyOn(component.todoStore, 'remove');

    component.updateEditingTodo(testTodo, testTitle);

    expect(testTodo.title).toEqual('name');
    expect(testTitle).toEqual(testTitle.trim());
    expect(testTitle.length).toEqual(0);
    expect(testTodo.editing).toEqual(false);
    expect(component.todoStore.remove).toHaveBeenCalledWith(testTodo);
  });

  it('check function editTodo', () => {
    const testTodo = new Todo('name');

    component.editTodo(testTodo);

    expect(testTodo.editing).toEqual(true);
  });

  it('check function toggleCopmletion', () => {
    const testTodo = new Todo('name');
    spyOn(component.todoStore, 'toggleCompletion');

    component.toggleCompletion(testTodo);

    expect(component.todoStore.toggleCompletion).toHaveBeenCalledWith(testTodo);
  });

  it('check function remove', () => {
    const testTodo = new Todo('name');
    spyOn(component.todoStore, 'remove');

    component.remove(testTodo);

    expect(component.todoStore.remove).toHaveBeenCalledWith(testTodo);
  });

  it('check function addTodo when newTodoText.length > 0', () => {
    component.newTodoText = 'test';
    spyOn(component.todoStore, 'add');

    component.addTodo();

    expect(component.todoStore.add).toHaveBeenCalledWith('test');
  });

  it('check function addTodo when newTodoText.length === 0', () => {
    component.newTodoText = '';

    component.addTodo();
  });

  it('check function filter all', () => {
    component.filter('all');

    component.todoStore.todos.length = 0;

    expect(component.todoStore.todos).toEqual([]);
    expect(component.todosClone).toEqual(component.todoStore.todos);
  });

  it('check function filter with next parameters: all => forEach => item.completed === true', () => {
    component.todoStore.todos.forEach(item => {
      item.completed = true;
    });

    component.filter('all');
  });

  it('should filter => active', () => {
    const arrCompleted = new Todo('name');

    component.filter('active');

    expect(component.todosClone).toContain(arrCompleted);
  });

  it('should filter => completed', () => {
    component.filter('completed');

    expect(component.todosClone).toEqual([]);
  });
});
