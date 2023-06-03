import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zepayroll-angular';
  initialLoading : boolean = true;

  onAppLoad (){
     // Terminate the loader
    //  setTimeout(() => this.initialLoading = false, 2000);
  }

  ngOnInit() {
    this.onAppLoad()
  }
}
