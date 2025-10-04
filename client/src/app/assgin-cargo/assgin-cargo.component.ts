import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-assgin-cargo',
  templateUrl: './assgin-cargo.component.html',
  styleUrls: ['./assgin-cargo.component.scss']
})
export class AssginCargoComponent implements OnInit{
  showError:boolean=false;
  errorMessage: any;
  cargList:any=[];
  statusModel:any={};
  showMessage:any;
  responseMessage:any;
  driverId:any;
  userId:any;

  constructor(private router:Router,private httpService:HttpService,private fb:FormBuilder,private authService:AuthService){}

  ngOnInit(): void {

     const userIdString = this.authService.getId; 
     console.log("User id String",this.userId);
        this.userId = userIdString ? parseInt(userIdString, 10) : null; 
        console.log("User id",this.userId);
        if (this.userId) {
          this.getDriverIdByUserId(this.userId); 
          console.log(this.driverId);
        }
       this.statusModel.newStatus=null;


       this.getAssginCargo();
      this.getCargoById();
  }
      getDriverIdByUserId(userId: number): void {
        this.httpService.getDriverIdByUserId(userId).subscribe(
          (id: number) => {
            this.driverId = id; 
            console.log("DriverID:",this.driverId);
            this.getAssginCargo()
          },
        );
  }

  getCargoById() {
      this.httpService.getCargoDetails(this.driverId).subscribe(
        data => {
          console.log("Cargo details:", data);
        },
        error => {
          console.error('Error fetching cargo details:', error);
        }
      );
    }

  getAssginCargo(){
    this.cargList=[];
    this.httpService.getAssignOrders(this.driverId).subscribe(
      (data)=>{
        console.log("Get working");
        // this.cargList.push(data);
        console.log(JSON.stringify(data));
        this.cargList = data;
        console.log(this.cargList);
      });
  }

  addStatus(value:any){
      this.statusModel.cargoId=value.id;
  }

  assignDriver(){
    if(this.statusModel.newStatus!=null){
      this.showMessage=false;
      this.httpService.updateCargoStatus(this.statusModel.newStatus,this.statusModel.cargoId).subscribe((data)=>{
        this.showMessage=true;
        this.responseMessage=data.message;
        this.getAssginCargo();
      });

    }
  }
}
