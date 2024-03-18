import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyInputComponent } from '../my-input/my-input.component';
import { AuthService } from '../services/auth.service';
import { emailValidator } from '../validators';
import { NavigateService } from './../services/navigate.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MyInputComponent, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private navigateService: NavigateService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required]],
    });
  }

  async submit() {
    let email = this.form?.value.email;
    let password = this.form?.controls.password.value;
    try {
      const result = await this.authService.signInWithEmilAndPassword(
        email,
        password
      );
      this.toastrService
        .success('Logged In Successfully', 'Success', { timeOut: 1500 })
        .onHidden.subscribe(() => {
          this.navigateService.returnToSavedUrl();
        });
    } catch (error) {
      this.toastrService.error('Wrong Credentials Supplied', 'Error', {
        timeOut: 1500,
      });
    }
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle().then((credentials) => {
      this.navigateService.returnToSavedUrl();
    });
  }

  back() {
    this.navigateService.returnToSavedUrl();
  }
  signUp() {
    this.navigateService.navigate('/signup');
  }
}
