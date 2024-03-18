import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'my-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './my-input.component.html',
  styleUrl: './my-input.component.scss',
})
export class MyInputComponent implements OnInit {
  @Input('form') form!: FormGroup;
  @Input('controlName') controlName: string = '';
  @Input('type') type: 'text' | 'email' | 'password' = 'text';
  @Input('placeholder') placeholder: string = '';
  @Output('valueChange') valueChange = new EventEmitter<string>();

  field?: AbstractControl;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.field = this.form.get(this.controlName)!;
  }

  // Emit value changes
  onValueChange(event: any) {
    this.valueChange.emit(event.target.value);
  }

  getErrorMessage() {
    if (this.field?.errors?.required) {
      return 'This field is required';
    }
    if (this.field?.errors?.email) {
      return 'Invalid Email';
    }
    if (this.field?.errors?.minlength) {
      let minLength = this.field.errors?.minlength.requiredLength;
      let name = this.controlName[0].toUpperCase() + this.controlName.slice(1);
      return `${name} must be at least ${minLength} charahcters`;
    }
    if (this.field?.errors?.repeatedPassword) {
      return "Passwords don't match";
    }
    return '';
  }
}
