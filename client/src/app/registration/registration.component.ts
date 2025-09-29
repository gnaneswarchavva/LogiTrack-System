import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

 //todo: complete missing code..
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
}
