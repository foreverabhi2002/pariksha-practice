import { Component } from '@angular/core';
import { NavbarService } from './service/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ExamPortal';

  constructor(public nav: NavbarService){}
}
