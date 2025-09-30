import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-addcargo',
  templateUrl: './addcargo.component.html',
  styleUrls: ['./addcargo.component.scss']
})
export class AddcargoComponent{
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

