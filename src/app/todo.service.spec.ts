import { async } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';
import { TodoService } from './todo.service';
import { User } from './user';
import { UserService } from './user.service';

describe('TodoService', () => {

  let todoService: TodoService;
  let dataServiceMock: TodoDataService;
  let userServiceMock: UserService;

  beforeEach(() => {
    dataServiceMock = mock(TodoDataService);
    userServiceMock = mock(UserService);

    todoService = new TodoService(instance(dataServiceMock), instance(userServiceMock));
  });

  it('getTodosCreatedByUser should filter todos by user id', async(() => {
    const todos = [
      new Todo(1, 'Todo 1', false, 1),
      new Todo(2, 'Todo 2', false, 2),
      new Todo(3, 'Todo 3', false, 1)
    ];
    when(dataServiceMock.getTodos()).thenReturn(of(todos));

    const user = new User(1, 'testuser');
    when(userServiceMock.currentUser).thenReturn(user);

    todoService.getTodosCreatedByUser()
      .subscribe(result => expect(result).toEqual([todos[0], todos[2]]));
  }));

  it('markAsDone should update todo', () => {
    const todo = new Todo(1, 'Todo 1', false, 1);
    when(dataServiceMock.updateTodo(anything())).thenReturn(EMPTY);

    todoService.markAsDone(todo).subscribe();

    const expected = new Todo(1, 'Todo 1', true, 1);
    verify(dataServiceMock.updateTodo(deepEqual(expected))).once();
  });
});
