import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUserModel, List, UpdateFull, UserFull, UserPreview } from '../moduls/users.module';
import { UsersService } from '../services/users.service';
import {Location} from '@angular/common';
import { NameValidator } from './custom';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  emailErrorVar!:boolean ;
  success=false ; 
  check! : boolean ; 
  name!:string ; 
  add=true; 
  userId!:string;
  ngSelect = 'mr';
  error!:string ; 
  model: CreateUserModel = { firstName: '', lastName: '', email:'' };
  Users!:List<UserPreview>;
  id!:string ; 
  UserById!:UserFull;
  update! : boolean ; 
  fullModel : UserFull  ={id:'', firstName:'' , lastName:'', email:'' ,title:'' ,gender:'' , phone:'',picture:'',dateOfBirth:'' ,
  registerDate:'',location:''};
  updateFull:UpdateFull={id:'' ,firstName:'', lastName:'', title:'',phone:'', gender:'', picture:'', dateOfBirth:'', registerDate:'', location:''}; 
  previewModel:UserPreview ={id: '',
    title: '',
    firstName: '',
    lastName: '',
    picture: ''}
  updateModel!:UpdateFull;
  titles: string[] = ['mr', 'ms', 'mrs', 'miss', 'dr','New Title'];
  genders:string[] = ['male', 'female'];

  constructor(private userService:UsersService,private router:Router,private location: Location,private route:ActivatedRoute) { }
  
  userForm = new FormGroup({
    FirstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    LastName: new FormControl('',[Validators.required, Validators.minLength(2)]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Picture : new FormControl(''),
    Title : new FormControl(''),
    Phone : new FormControl(''),
    Gender : new FormControl(''),
    DataOfBirth : new FormControl(''),
    Location : new FormControl(''),
    registorDate : new FormControl('')
  } , { validators:NameValidator });

  ngOnInit(): void {
    this.check = this.formURLcheck();
  
    console.log(this.check);
    if(this.check === true){
      this.route.queryParams.subscribe(params=>{
        this.id = params[`id`];
      });
      this.getUserById(this.id);
    }
  }

  get FirstName(){
    return this.userForm.controls.FirstName ; 
  }
  get LastName(){
    return this.userForm.controls.LastName ; 
  }
  get Email(){
    return this.userForm.controls.Email;
  }
  get Picture(){
    return this.userForm.controls.Picture;
  }
  get Gender(){
    return this.userForm.controls.Gender ; 
  }
  get Title(){
    return this.userForm.controls.Title ; 
  }
  get dataOfBirth(){
     return this.userForm.controls.DataOfBirth; 
  }
  get Location(){
     return this.userForm.controls.Location ; 
  }
  get registorDate(){
    return this.userForm.controls.registorDate ; 
  }
  get Phone(){
    return this.userForm.controls.Phone ; 
  }
  formURLcheck():boolean{
    if(this.router.url === "/form-component"){
      this.name = "new";
     
      return false; 
    }
    this.Email.disabled;
    this.name="" ; 
    return true; 
  }
 
  onSubmit() {
    if(this.name == "new"){
      
      this.createUser( this.FirstName.value as any ,this.LastName.value as any , this.Email.value as any);      
    }else{
      this.toUpdateFullUser();
      // this.updateUser() ; 
    }
    
  }

  getUserById(id:string):void{
   
    this.Email.disable() ; 
    this.userService.getUserById(this.id).subscribe(responce=>
      {
       this.userForm.patchValue({
        FirstName : responce.firstName , 
        LastName:responce.lastName,
        Email:responce.email , 
        Picture :responce.picture , 
        Title: responce.title,
        Gender : responce.gender,
        DataOfBirth :responce.dateOfBirth,
        Location : responce.location , 
        registorDate: responce.registerDate
       })
      }) ;
    
  }

  
  //updateUserupdate(){
   // this.userService.updateUser(this.id,this.fullModel).subscribe(responce=>console.log(responce.email));
    //this.userService.updateUser(this.id,this.updateFull).subscribe(responce=> console.log(responce));
  //}
  createUser(firstname:string , lastname:string , email:string):void{
    console.log(this.model.email +  " model add");
    this.userService.creatUser({
      firstName : firstname,
      lastName : lastname,
      email : email,
    }).subscribe(
      data => this.successCreate(data),
      error => this.emailError(error)
    );
  }
  
  toUpdateFullUser(){
    console.log(this.userForm.value);
    this.userService.updateFullUser(this.id,{
      id : this.id,
      title: this.Title.value,
      firstName: this.FirstName.value,
      lastName:  this.LastName.value,
      gender:  this.Gender.value,
      //dateOfBirth:  this.fullModel.dateOfBirth,
      registerDate: this.registorDate.value,
      phone:  this.Phone.value,
      picture:  this.Picture.value,
      
    } as any).subscribe(
      data => this.successCreate(data),
      error => this.emailError(error)
    );
  }
  back(): void {
    this.location.back() ; 
  }
   
  emailError(error:HttpErrorResponse)
  {
    console.log("email used before");
    this.emailErrorVar = true ; 
    console.log(this.emailErrorVar)
  }
  
  successCreate(data:UserFull){
    //console.log("success", data);
    this.success = true ;
      
      setTimeout(() => {
        this.back()
      }, 2000);
    
  }

  delay(ms: number) {
    console.log("timer");
    return new Promise( resolve => setTimeout(resolve, ms) );
   
  }


}
