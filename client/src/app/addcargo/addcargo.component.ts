import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-addcargo',
  templateUrl: './addcargo.component.html'

})
export class AddcargoComponent implements OnInit {
  itemForm: FormGroup;
  itemForm1: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  cargList: any = [];
  assignModel: any = {};
  driverList: any = []
  showMessage: any;
  responseMessage: any;
  driverId: any;
  cargoId: any
  cargoToShow: any[] = [];
  constructor(public router: Router, public httpService: HttpService, private formBuilder: FormBuilder, private authService: AuthService) {
    this.itemForm = this.formBuilder.group({
      content: [this.formModel.content, [Validators.required]],
      size: [this.formModel.size, [Validators.required]],
      status: [this.formModel.status, [Validators.required]]
    });
    this.itemForm1 = this.formBuilder.group({
      driver: [this.formModel.driver]
    })
  }
  ngOnInit(): void {
    this.getCargo();
    this.getDrivers();
    this.driverId = null;
  }
  getCargo() {
    this.cargList = [];
    this.httpService.getCargo().subscribe((data: any) => {
      this.cargList = data;
      this.cargoToShow = this.cargList;
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "Cannot fetch cargo. Please try again later.";
      console.error('Error:', error);
    });;
  }

  getDrivers() {
    this.driverList = [];
    this.httpService.getDrivers().subscribe((data: any) => {
      this.driverList = data;
      console.log(this.driverList);
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "Cannot get Drivers. Please try again later.";
      console.error('Error:', error);
    });;

  }
  logout() {
    this.authService.logout(); // clear token or session
    this.router.navigate(['/login']); // redirect to login page
  }
  
  search() {
    this.showError = false;
    if (this.cargoId) {
      this.httpService.getCargoById(this.cargoId).subscribe((data: any) => {
        this.cargoToShow = [data];
      }, error => {
        // Handle error
        this.showError = true;
        this.errorMessage = "No Record found with entered search ID";
        console.error('Login error:', error);
      });;
    }
    else {
      this.cargoToShow = this.cargList;
    }
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.showError = false;

      this.httpService.addCargo(this.itemForm.value).subscribe((data: any) => {
        this.itemForm.reset();
        this.getCargo();
      }, error => {
        // Handle error
        this.showError = true;
        this.errorMessage = "An error occurred while logging in. Please try again later.";
        console.error('Login error:', error);
      });;
    }
    else {
      this.itemForm.markAllAsTouched();
    }
  }
  addDriver(value: any) {
    this.assignModel.cargoId = value.id
  }
  

  assignDriver() {
    console.log("assigning")
    this.assignModel.driverId = this.driverId;
    console.log(this.assignModel.driverId)
    if (this.assignModel.driverId != null) {
      this.showMessage = false;
      this.httpService.assignDriver(this.assignModel.driverId, this.assignModel.cargoId).subscribe((data: any) => {
        this.showMessage = true;
        console.log("hello" + JSON.stringify(data));
        this.responseMessage = data.message;
        //window.location.reload();
      }, error => {
        // Handle error
        this.showError = true;
        this.errorMessage = "An error occurred while assigning driver. Please try again later.";
        console.error('Error:', error);
      });;
    }
  }

}