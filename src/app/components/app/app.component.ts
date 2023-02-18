import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {StateActionsService} from '../../services/state/state-actions.service';
import {User} from '../../typings/interfaces/user.interface';
import {StateService} from '../../services/state/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [0, Validators.required],
  });

  users$ = this.state.select(({users}) => users);

  constructor(
    private fb: FormBuilder,
    private state: StateService,
    private stateActions: StateActionsService
  ) {
  }

  addNewUser(): void {
    this.stateActions.addNewUser(this.form.value as User);
    this.form.reset();
  }

  removeUser(index: number): void {
    this.stateActions.removeUser(index);
  }

}
