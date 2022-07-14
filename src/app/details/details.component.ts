import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPreview } from '../moduls/users.module';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id!:string; 
  UserById!:UserPreview;

  constructor(private route:ActivatedRoute,private userService:UsersService) { }
 
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.id = params[`id`];
      console.log(this.id);
    })
    this.getUserById(this.id);
  }

  getUserById(id:string):void{
    this.userService.getUserById(this.id).subscribe(responce=> {
      console.log("this is responce from details")
      console.log(responce);
      this.UserById=responce ; 
      console.log(this.UserById);
    });
  }
  showUserDate(){
    this.getUserById(this.id);
  }
  
}
