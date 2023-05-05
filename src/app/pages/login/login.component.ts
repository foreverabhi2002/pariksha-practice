import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ApiService } from 'src/app/services/api.service';
//import { hash } from 'bcrypt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public authStatus: any;
  constructor(
    public apiService: ApiService,
    public router: Router // public toastService: ToastService
  ) {
    this.checkAuthStatus();
  }

  public async checkAuthStatus() {
    this.authStatus = await localStorage.getItem('accessToken');
    if (this.authStatus) {
      this.router.navigate(['/']);
    }
  }

  public form = new UntypedFormGroup({
    email: new UntypedFormControl(sessionStorage.getItem('email'), [
      Validators.required,
      Validators.email,
      Validators.minLength(2),
      Validators.maxLength(255),
    ]),
    password: new UntypedFormControl(sessionStorage.getItem('password'), [
      Validators.required,
    ]),
  });

  public async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Invalid form');
      return;
    }
    this.form.value.email = this.form.value.email.toLowerCase();
    this.apiService.login(this.form.value).subscribe(
      (resp) => {
        console.log(resp.message);
        localStorage.setItem('accessToken', resp.data.accessToken);
        localStorage.setItem('user', JSON.stringify(resp.data.user));
        // this.toastr.success(resp.message);
        // this.toastrService.show(resp.message, 'Success', { status: 'success' });
        // this.toastService.success('Success', `${resp.message}`);
        setTimeout(() => {
          this.router.navigateByUrl('/').then(() => {
            window.location.reload();
          });
        }, 3000);
      },
      (error) => {
        // this.toastService.error('Failed', `${error.error.message}`);
        console.log(error);
        // this.toastrService.show(error.error.message, 'Error', {
        //   status: 'danger',
        // });
        // this.toastrService.error(error.error.message);
      }
    );
  }

  public get email(): AbstractControl {
    return this.form.controls['email'];
  }

  public get password(): AbstractControl {
    return this.form.controls['password'];
  }
}
