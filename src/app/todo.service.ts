import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private todoDataService: TodoDataService,
    private userService: UserService
  ) { }

  getTodosCreatedByUser(): Observable<Todo[]> {
    return this.todoDataService.getTodos()
      .pipe(
        map(todos => todos.filter(t => t.creatorId === this.userService.currentUser.id))
      );
  }

  markAsDone(todo: Todo): Observable<void> {
    todo.done = true;
    return this.todoDataService.updateTodo(todo);
  }
}
