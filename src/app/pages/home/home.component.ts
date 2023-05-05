import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public authStatus: any;
  constructor(public apiService: ApiService, public router: Router) {
    this.checkAuthStatus();
  }

  public async checkAuthStatus() {
    this.authStatus = await localStorage.getItem('accessToken');
    if (!this.authStatus) {
      this.router.navigate(['/login']);
    }
  }
}
