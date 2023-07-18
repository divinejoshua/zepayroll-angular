import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getTransactionList, getTransactionListFailure, getTransactionListSuccess } from './transactions.actions';
import { DataService } from '../../services/data/data.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class TransactionsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private DataService: DataService
  ) {}

  // Run this code when a get transaction action is dispatched
  getTransactionList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTransactionList),
      switchMap(() =>
        // Call the getTodos method, convert it to an observable
        from(this.DataService.getTransactionList()).pipe(
          // Take the returned value and return a new success action containing the todos
          map((dataList) => getTransactionListSuccess({ dataList: dataList, error: false})),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(getTransactionListFailure({ error })))
        )
      )
    )
  );
}
