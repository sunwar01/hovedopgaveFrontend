import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../core/services/api/user.service';
import {Router} from '@angular/router';
import {CurrentUserService} from '../../core/services/currentUserService/currentUser.service';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {first} from 'rxjs';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {ThemeService} from '../../core/services/themeService/theme.service';
import {ToastService} from '../../core/services/toastService/toast.service';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ImageModule} from 'primeng/image';

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
    NgIf,
    CardModule,
    ButtonModule,
    PasswordModule,
    FloatLabelModule,
    InputTextModule,
    ToastModule,
    ProgressSpinnerModule,
    ImageModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {

  isLoading: boolean = false;

  logoSrc: string = '/ps_logo.png';

  loginForm: FormGroup<{username: FormControl<string>, password: FormControl<string> }>;

  constructor(private fb: FormBuilder, private userService: UserService, private toastService: ToastService, private router: Router, private currentUserService: CurrentUserService, private themeService: ThemeService)
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


    this.isLoading = true;

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

              this.toastService.showError("Forkert login");

            },
            next: (response) =>
            {
              this.currentUserService.setCurrentUser(response.user, 1);
              this.currentUserService.setToken(response.user_token, 1);

            },
            complete: () =>
            {

              this.router.navigate(['/select-store']);


            }


          });

         this.isLoading = false;


    }
  }



  ngOnInit(): void
  {

    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.logoSrc = isDarkMode ? "/ps_logo_hvid.png" : "/ps_logo.png";
    });

    this.currentUserService.currentUser$
      .pipe(first(currentUser => currentUser !== null))
      .subscribe(currentUser => {
        this.router.navigate(['/select-store']);
      });


  }


}
