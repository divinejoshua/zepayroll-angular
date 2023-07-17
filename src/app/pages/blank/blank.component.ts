import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/store/app.state';
import { increment, decrement, reset } from 'src/app/core/store/counter/counter.action';
import { selectAllCounter } from 'src/app/core/store/counter/counter.selectors';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent {

  count$: Observable<number>;

  constructor(public store: Store<AppState>) {
    this.count$ = store.select(selectAllCounter);
  }



  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset(resetValue: number) {
    this.store.dispatch(reset({resetValue }));
  }


}
