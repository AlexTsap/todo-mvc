import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TodoStore } from '../service/todo.store.service';
import { TodoComponent } from './app.component';
import { Todo } from '../models/todo.model';

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
        TodoStore,
        TodoComponent
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;

    todoStore = TestBed.get(TodoStore);
    todoStore.todos = [
      new Todo('name')
    ];

  });

  it('check function removeCompleted', () => {
    spyOn(component.todoStore, 'removeCompleted');

    component.removeCompleted();

    expect(component.todoStore.removeCompleted).toHaveBeenCalled();
  });

  it('check function stopEditing', () => {
    const editingTitle = 'name';
    const testTodo = new Todo('name');

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
    const testTodo = new Todo('name');
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
    expect(component.todoStore.remove).toHaveBeenCalled();
    expect(component.todoStore.remove).toHaveBeenCalledWith(testTodo);
  });

  it('should edit Todo', () => {
    component.editTodo(new Todo(''));
  });

  it('should toggle copmletion', () => {
    component.toggleCompletion(new Todo(''));
  });

  it('should remove', () => {
    component.remove(new Todo(''));
  });

  it('should add Todo => newTodoText.length > 0', () => {
    component.newTodoText = 'test';

    component.addTodo();
  });

  it('should add Todo => newTodoText.length === 0', () => {
    component.newTodoText = '';

    component.addTodo();
  });

  it('should filter', () => {
    component.filter('all');

    component.todoStore.todos.length = 0;

    expect(component.todoStore.todos).toEqual([]);
  });

  it('check filter with next parameters: all => forEach => item.completed === true', () => {
    component.todoStore.todos.forEach(item => {
      item.completed = true;
    });

    component.filter('all');
  });

  it('should filter => active', () => {
    component.filter('active');
  });

  it('should filter => completed', () => {
    component.filter('completed');
  });


})
;
