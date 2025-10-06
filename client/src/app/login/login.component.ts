import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  itemForm!: FormGroup;
  showError = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.itemForm.valid) {
      const loginDetails = this.itemForm.value;
      this.httpService.Login(loginDetails).subscribe({
        next: (response: any) => {
          this.authService.SetId(response.id);
          this.authService.saveToken(response.token);
          this.authService.SetRole(response.role);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.showError = true;
          this.errorMessage = 'Invalid username or password';
        }
      });
    } else {
      this.showError = true;
      this.errorMessage = 'Please fill in all required fields';
    }
  }

  registration(): void {
    this.router.navigateByUrl('/registration');
  }
}