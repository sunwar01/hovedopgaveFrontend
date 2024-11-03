import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../core/services/api/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {CurrentUserService} from '../../core/services/currentUserService/currentUser.service';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    NgOptimizedImage,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton,
    NgIf
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {


  loginForm: FormGroup<{username: FormControl<string>, password: FormControl<string> }>;

  constructor(private fb: FormBuilder, private userService: UserService, public snackBar: MatSnackBar, private router: Router, private currentUserService: CurrentUserService)
  {
    this.loginForm = this.fb.nonNullable.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid)
    {
      return;
    }

    if (this.loginForm.value.username && this.loginForm.value.password)
    {
      this.userService
        .ValidateLogin(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(
          {
            error: (error) =>
            {
              this.loginForm.controls['username'].setErrors({invalid: true});
              this.loginForm.controls['password'].setErrors({invalid: true});


              this.snackBar.open('Invalid login credentials.', 'Luk', {
                duration: 3000,
                verticalPosition: 'top',
              });


            },
            next: (response) =>
            {
              this.currentUserService.setCurrentUser(response.user, 1);
              this.currentUserService.setToken(response.user_token, 1);

            },
            complete: () =>
            {
              this.snackBar.open('Login successful', 'Luk', {
                duration: 3000,
                verticalPosition: 'top',
              });


              //route to main page later

            }

          });

    }
  }


}
