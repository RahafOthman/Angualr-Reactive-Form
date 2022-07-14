import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPreview } from '../moduls/users.module';
import { UsersService } from '../services/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  id!:string ; 
  UserById!:UserPreview;
  constructor(private route:ActivatedRoute,private userService:UsersService,private router:Router,private location: Location) { }
 
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.id = params[`id`];
      console.log(this.id);
    })
    //this.getUserById(this.id);
  }
  goToDetails(){
    this.router.navigate([`details-component`],{queryParams:{id : this.id},relativeTo: this.route});
  }

  goToPost(){
    this.router.navigate([`post-component`],{queryParams:{id : this.id},relativeTo: this.route});
  }

  getUserById(id:string):void{
    this.userService.getUserById(this.id).subscribe(responce=> {
      console.log("this is responce from user details")
      console.log(responce);
      this.UserById=responce ; 
    });
  }
  showUserDate(){
    this.getUserById(this.id);
  }
  back(): void {
    //this.router.navigate(['/second-component']);
    this.location.back();
  }
}
