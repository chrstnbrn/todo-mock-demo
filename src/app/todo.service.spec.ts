import { async } from '@angular/core/testing';
import { empty, of } from 'rxjs';

import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';
import { TodoService } from './todo.service';
import { User } from './user';
import { UserService } from './user.service';

describe('TodoService', () => {

  let todoService: TodoService;
  let dataServiceMock: jest.Mocked<Partial<TodoDataService>>;
  let userServiceMock: jest.Mocked<Partial<UserService>>;

  beforeEach(() => {
    dataServiceMock = {
      getTodos: jest.fn(),
      updateTodo: jest.fn()
    };

    userServiceMock = {};

    todoService = new TodoService(
      dataServiceMock as unknown as TodoDataService,
      userServiceMock as unknown as UserService);
  });

  it('getTodosCreatedByUser should filter todos by user id', async(() => {
    const todos = [
      new Todo(1, 'Write tests', false, 1),
      new Todo(2, 'Improve tests', false, 2),
      new Todo(3, 'Write blog post', false, 1)
    ];
    dataServiceMock.getTodos.mockReturnValue(of(todos));

    const user = new User(1, 'testuser');
    Object.defineProperty(userServiceMock, 'currentUser', { get: jest.fn(() => user) });

    const expected = [
      todos[0],
      todos[2]
    ];

    todoService.getTodosCreatedByUser()
      .subscribe(actual => expect(actual).toEqual(expected));
  }));

  it('markAsDone should update todo', () => {
    const todo = new Todo(1, 'Write tests', false, 1);
    dataServiceMock.updateTodo.mockReturnValue(empty());

    todoService.markAsDone(todo).subscribe();

    const expected = new Todo(1, 'Write tests', true, 1);
    expect(dataServiceMock.updateTodo).toHaveBeenCalledWith(expected);
  });
});
