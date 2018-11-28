import { async } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';
import { TodoService } from './todo.service';
import { User } from './user';
import { UserService } from './user.service';

describe('TodoService', () => {

  let todoService: TodoService;
  let dataServiceMock: IMock<TodoDataService>;
  let userServiceMock: IMock<UserService>;

  beforeEach(() => {
    dataServiceMock = Mock.ofType(TodoDataService);
    userServiceMock = Mock.ofType(UserService);

    todoService = new TodoService(dataServiceMock.object, userServiceMock.object);
  });

  it('getTodosCreatedByUser should filter todos by user id', async(() => {
    const todos = [
      new Todo(1, 'Todo 1', false, 1),
      new Todo(2, 'Todo 2', false, 2),
      new Todo(3, 'Todo 3', false, 1)
    ];
    dataServiceMock.setup(x => x.getTodos()).returns(() => of(todos));

    const user = new User(1, 'testuser');
    userServiceMock.setup(x => x.currentUser).returns(() => user);

    todoService.getTodosCreatedByUser()
      .subscribe(result => expect(result).toEqual([todos[0], todos[2]]));
  }));

  it('markAsDone should update todo', () => {
    const todo = new Todo(1, 'Todo 1', false, 1);
    dataServiceMock.setup(x => x.updateTodo(It.isAny())).returns(() => EMPTY);

    todoService.markAsDone(todo).subscribe();

    const expected = new Todo(1, 'Todo 1', true, 1);
    dataServiceMock.verify(x => x.updateTodo(expected), Times.once());
  });
});
