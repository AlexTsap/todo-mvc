import { Component } from '@angular/core';
import { Todo } from './../models/todo.model';
import { TodoStore } from '../service/todo.store.service';

@Component({
  selector: 'sg-todo-app',
  templateUrl: './app.component.html'
})
export class TodoComponent {
  todoStore: TodoStore;
  newTodoText = '';
  todosClone: Todo[];

  constructor(todoStore: TodoStore) {
    this.todoStore = todoStore;
    this.todosClone = todoStore.todos;
  }

  stopEditing(todo: Todo, editedTitle: string) {
    todo.title = editedTitle;
    todo.editing = false;
  }

  cancelEditingTodo(todo: Todo) {
    todo.editing = false;
  }

  updateEditingTodo(todo: Todo, editedTitle: string) {
    editedTitle = editedTitle.trim();
    todo.editing = false;

    if (editedTitle.length === 0) {
      return this.todoStore.remove(todo);
    }

    todo.title = editedTitle;
  }

  editTodo(todo: Todo) {
    todo.editing = true;
  }

  removeCompleted() {
    this.todoStore.removeCompleted();
  }

  toggleCompletion(todo: Todo) {
    this.todoStore.toggleCompletion(todo);
  }

  remove(todo: Todo){
    this.todoStore.remove(todo);
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
      this.todoStore.add(this.newTodoText);
      this.newTodoText = '';
    }
  }

  filter(type: string) {
    const arrAll = this.todoStore.todos;
    const arrActive = [];
    const arrCompleted = [];

    arrAll.forEach(item => {
      if (item.completed) {
        arrActive.push(item);
      } else {
        arrCompleted.push(item);
      }
    });

    switch (type) {
      case  'all':
        this.todosClone = arrAll;
        break;

      case  'active':
        this.todosClone = arrCompleted;
        break;

      case  'completed':
        this.todosClone = arrActive;
        break;
    }
  }
}
