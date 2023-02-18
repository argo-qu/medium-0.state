import { Injectable } from '@angular/core';
import {StateService} from './state.service';
import {User} from '../../typings/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class StateActionsService {
  constructor(private state: StateService) { }

  addNewUser(user: User): void {
    const {users} = this.state.stateCurrentValue;
    this.state.setState({
      users: users.concat(user)
    });
  }

  removeUser(index: number): void {
    const {users} = this.state.stateCurrentValue;
    this.state.setState({
      users: users.slice(0, index).concat(users.slice(index + 1))
    });
  }

}
