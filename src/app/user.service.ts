import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  get currentUser(): User {
    return this._user;
  }

  private _user: User;

  logIn() {
    this._user = new User(123, 'dummyuser');
  }

}
