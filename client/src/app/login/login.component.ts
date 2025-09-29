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
  itemForm: FormGroup;
  formModel:any={};
  showError:boolean=false;
  errorMessage:any;
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
    {
      this.itemForm = this.formBuilder.group({
        //compelete this 
      username:['',Validators.required],
      password:['',Validators.required]
       
    });
  }

  ngOnInit(): void {
  }
  onLogin() {
      if (this.itemForm.valid) {
        const loginDetails = this.itemForm.value;
        this.httpService.Login(loginDetails).subscribe(
          (response: any) => {
            this.authService.saveToken(response.token);
            this.authService.SetRole(response.role);
            this.router.navigate(['/dashboard']); // Navigate to the dashboard or any other route
          },
          (error) => {
            this.showError = true;
            this.errorMessage = 'Invalid username or password';
          }
        );
      } else {
        this.showError = true;
        this.errorMessage = 'Please fill in all required fields';
      }
    }
  
    registration() {
      this.router.navigateByUrl('registration');
    }
}
