import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BasicAuthService } from '../../service/BasicAuth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../service/toast.service';
import { HelperService } from '../../service/helper.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private basicAuthService = inject(BasicAuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private readonly formBuilder = inject(FormBuilder);
  private helperService = inject(HelperService);

  public message!: any;
  public formSign!: FormGroup<{
    username: FormControl,
    password: FormControl
  }>;

  public initForm() {
    this.formSign = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  };

  ngOnInit(): void {
    this.initForm();
  }

  handleLogin() {
    this.formSign.markAllAsTouched();
    if (this.formSign.invalid) {
      this.helperService.scrollToInvalidControl();
      return;
    }

    this.basicAuthService.executeBasicAuthService(this.formSign.get('username')?.value, this.formSign.get('password')?.value).subscribe({
      next: (data: any) => {
        if (data?.message) {
          this.toastService.success(data?.message);
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        const errorMessage = error?.error?.message;
        this.toastService.error(errorMessage);
      },
    })
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
