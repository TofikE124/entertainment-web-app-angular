import { NgIf } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyInputComponent } from '../my-input/my-input.component';
import { AuthService } from '../services/auth.service';
import { emailValidator } from '../validators';
import { NavigateService } from '../services/navigate.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, MyInputComponent, ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit, AfterViewInit {
  form?: FormGroup;
  returnUrl: string = '';
  returnQueryParams: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private navigateService: NavigateService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatedPassword: ['', [Validators.required]],
    });

    this.route.queryParamMap.subscribe((queryParams) => {
      this.returnUrl = queryParams.get('returnUrl') || '';
      this.returnQueryParams = queryParams.get('returnQueryParams') || '{}';
    });
  }
  ngAfterViewInit(): void {}

  async submit() {
    let email = this.form?.value.email;
    let password = this.form?.controls.password.value;
    let repeatedPassword = this.form?.controls.repeatedPassword.value;

    if (password != repeatedPassword) {
      this.form?.get('repeatedPassword')?.setErrors({ repeatedPassword: true });
      return;
    }

    try {
      const result = await this.authService.signUpWithCredentials(
        email,
        password
      );
      this.toastrService
        .success('Signed Up Sucessfully', 'Sucess', {
          timeOut: 1500,
        })
        .onHidden.subscribe(() => {
          this.navigateService.navigate('/login');
        });
    } catch (error: any) {
      this.toastrService.error(error, 'Error');
    }
  }

  back() {
    this.navigateService.returnToSavedUrl();
  }

  login() {
    this.navigateService.navigate('/login');
  }
}
