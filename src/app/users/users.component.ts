import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserModel, List, UserPreview } from '../moduls/users.module';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  name = 'hala';
  add=true; 
  userId!:string;
  Users!:List<UserPreview>;
  userById!:UserPreview ; 
  createUserModel!:CreateUserModel ; 
  constructor(private userService:UsersService,private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
  }
  
  handleClear(){
    this.name = ' ';
  }
  getUsers():void{
    this.userService.getUsers().subscribe(responce =>{
      this.Users = responce ; 
      console.log(this.Users);
    })
  }

  getUserById(id:string):void{
    this.userService.getUserById(id).subscribe(responce=>{
        this.userById = responce ; 
       // this.router.navigate(['/user-details-component',`${id}`],{queryParams:{id}});
      this.router.navigate(['post-component', `${id}` ], {queryParams:{id}});
    })
  }
 
  deleteUser(id:string){
    this.userService.deleteUser(id).subscribe(responce=>{
      console.log(responce) ; 
    });
    this.getUsers();
  }

  toUpdateForm(id:string){
    this.router.navigate(['form-component',`${id}`],{queryParams:{id}});
  }
 
  createUser(){
    console.log("done");
    this.router.navigate(['form-component']) ; 
  }
  
}
