import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ApiService } from 'src/app/services/api.service';
// import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public authStatus: any;
  public form = new UntypedFormGroup({
    name: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new UntypedFormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(2),
      Validators.maxLength(255),
    ]),
    password: new UntypedFormControl('', [Validators.required]),
    phone: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
    ]),
  });

  constructor(
    public apiService: ApiService,
    private router: Router,
    // public toastService: ToastService
  ) {
    this.checkAuthStatus();
  }

  public async checkAuthStatus() {
    this.authStatus = await localStorage.getItem('accessToken');
    if (this.authStatus) {
      this.router.navigate(['/']);
    }
  }

  public async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Invalid form');
      return;
    }
    console.log(this.form.value);
    this.form.value.email = this.form.value.email.toLowerCase();
    this.apiService.register(this.form.value).subscribe(
      (resp) => {
        const { email, password } = this.form.value;
        // sessionStorage.setItem('password', password);
        // this.toastService.success(
        //   'User created successfully',
        //   'Check mail and verify yourself before logging in'
        // );
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000);
      },
      (error) => {
        console.error('error', error);
        // this.toastService.error('Error', `${error.error.message}`);
      }
    );
  }

  public get email(): AbstractControl {
    return this.form.controls['email'];
  }
  public get password(): AbstractControl {
    return this.form.controls['password'];
  }
  public get name(): AbstractControl {
    return this.form.controls['name'];
  }
  public get phone(): AbstractControl {
    return this.form.controls['phone'];
  }
}
