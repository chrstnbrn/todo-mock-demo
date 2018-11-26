import { async } from '@angular/core/testing';
import createMockInstance from 'jest-create-mock-instance';
import { EMPTY, of } from 'rxjs';

import { mockGetter } from './mock-getter';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';
import { TodoService } from './todo.service';
import { User } from './user';
import { UserService } from './user.service';

describe('TodoService', () => {

  let todoService: TodoService;
  let dataServiceMock: jest.Mocked<TodoDataService>;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(() => {
    dataServiceMock = createMockInstance(TodoDataService);
    userServiceMock = createMockInstance(UserService);

    todoService = new TodoService(dataServiceMock, userServiceMock);
  });

  it('getTodosCreatedByUser should filter todos by user id', async(() => {
    const todos = [
      new Todo(1, 'Write tests', false, 1),
      new Todo(2, 'Improve tests', false, 2),
      new Todo(3, 'Write blog post', false, 1)
    ];
    dataServiceMock.getTodos.mockReturnValue(of(todos));

    const user = new User(1, 'testuser');
    mockGetter(userServiceMock, 'currentUser', user);

    todoService.getTodosCreatedByUser()
      .subscribe(result => expect(result).toEqual([todos[0], todos[2]]));
  }));

  it('markAsDone should update todo', () => {
    const todo = new Todo(1, 'Write tests', false, 1);
    dataServiceMock.updateTodo.mockReturnValue(EMPTY);

    todoService.markAsDone(todo).subscribe();

    const expected = new Todo(1, 'Write tests', true, 1);
    expect(dataServiceMock.updateTodo).toHaveBeenCalledWith(expected);
  });
});
