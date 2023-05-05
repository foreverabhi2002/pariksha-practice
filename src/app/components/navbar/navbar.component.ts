import { Component, Directive, HostListener, HostBinding } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public authStatus: any;
  public user: any;
  public username: any;
  constructor(
    public apiService: ApiService,
    public router: Router,
    // public toastService: ToastService
  ) {
    this.checkAuthStatus();
  }

  public async checkAuthStatus() {
    this.authStatus = await localStorage.getItem('accessToken');
    this.user = await localStorage.getItem('user');
    let user = await JSON.parse(this.user);
    if (user) {
      let username = user.name.split(' ');
      this.username = username[0];
    }
  }

  public async logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    // this.toastService.success('Success', 'Logged out successfully');
    setTimeout(() => {
      this.router.navigateByUrl('/').then(() => {
        window.location.reload();
      });
    }, 3000);
  }

  navbarfixed: boolean = false;

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 100) {
      this.navbarfixed = true;
    }
    else {
      this.navbarfixed = false;
    }
  }

}
@Directive({
  selector: '[appdropdown]'
})
export class DropdownDirective {
  @HostBinding('class.Open') isOpen = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}