import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { Observable } from 'rxjs';
import { selectAllAccessToken, selectAllUserDetails } from 'src/app/core/store/auth/auth.selectors';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() HeaderName : string = '';
  @Input() SubHeaderName : string = '';


  userDetails$: Observable<any>;
  access_token$: Observable<string>;


  // Constructor
  constructor(public store: Store<AppState>){
    this.userDetails$ = store.select(selectAllUserDetails);
    this.access_token$ = store.select(selectAllAccessToken);
  }


}
