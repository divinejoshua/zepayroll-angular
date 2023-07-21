import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() HeaderName : string = '';
  @Input() SubHeaderName : string = '';

  userEmail : string = ""


  // Constructor
  constructor(public store: Store<AppState>){}




}
