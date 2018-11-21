import { async } from '@angular/core/testing';
import { of, EMPTY } from 'rxjs';
import * as TypeMoq from 'typemoq';
import { Times } from 'typemoq';

import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';
import { TodoService } from './todo.service';
import { User } from './user';
import { UserService } from './user.service';

describe('TodoService', () => {

  let todoService: TodoService;
  let dataServiceMock: TypeMoq.IMock<TodoDataService>;
  let userServiceMock: TypeMoq.IMock<UserService>;

  beforeEach(() => {
    dataServiceMock = TypeMoq.Mock.ofType(TodoDataService);
    userServiceMock = TypeMoq.Mock.ofType(UserService);

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
    dataServiceMock.setup(x => x.updateTodo(TypeMoq.It.isAny())).returns(() => EMPTY);

    todoService.markAsDone(todo).subscribe();

    const expected = new Todo(1, 'Todo 1', true, 1);
    dataServiceMock.verify(x => x.updateTodo(expected), Times.atLeastOnce());
  });
});
