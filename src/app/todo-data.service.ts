import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';

import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  private todos: Todo[];

  constructor() {}

  createTodo(todo: Todo): Observable<void> {
    this.todos.push(todo);
    return EMPTY;
  }

  updateTodo(todo: Todo): Observable<void> {
    const savedTodo = this.todos.find(t => t.id === todo.id);
    Object.assign(savedTodo, todo);
    return EMPTY;
  }

  deleteTodo(id: number): Observable<void> {
    this.todos = this.todos.filter(t => t.id !== id);
    return EMPTY;
  }

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }
}
