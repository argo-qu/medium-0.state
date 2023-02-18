import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, map, Observable} from 'rxjs';
import {State} from '../../typings/interfaces/state.interface';
import {deepEqual} from 'fast-equals';
import {initialState} from '../../constants/initial-state.const';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state: BehaviorSubject<State> = new BehaviorSubject<State>(initialState);

  get state$(): Observable<State> {
    return this.state.asObservable();
  }

  get stateCurrentValue(): State {
    return this.state.getValue();
  }

  select<K>(mapFn: (state: State) => K): Observable<K> {
    return this.state$.pipe(
      map(mapFn),
      distinctUntilChanged((a: K, b: K) => deepEqual(a, b))
    );
  }

  setState(newState: State): void {
    this.state.next({...newState});
  }
}
