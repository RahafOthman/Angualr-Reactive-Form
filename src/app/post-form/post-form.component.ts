import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostCreate, PostPreview } from '../moduls/user-post.module';
import { UserPostService } from '../services/user-post.service';
import {Location} from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  post!:PostPreview[];
  ownerId!:string;
  ownerName! :string ; 
  postId!:string ; 
  check! : boolean ; 
  success!:boolean  ; 
  add!:string; 
  formInvalid!:boolean ; 
  constructor(private postService:UserPostService,private route:ActivatedRoute,private router:Router,private location:Location
    ,private userService:UsersService) { }
  
  //post form 
  postForm = new FormGroup({
    Text: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    image: new FormControl('',Validators.required),
    likes: new FormControl( 0,[Validators.required, Validators.min(0)]),
    tags : new FormArray([new FormControl('')]),
    owner : new FormControl(''),
  });

  get Text(){
    return this.postForm.controls.Text ; 
  }
  get image(){
    return this.postForm.controls.image ; 
  }
  get likes(){
    return this.postForm.controls.likes ; 
  }
  get owner(){
    return this.postForm.controls.owner ; 
  }
  get tags(){
    return this.postForm.controls.tags  as FormArray; 
  }
 
  ngOnInit(): void {
  
    this.route.queryParams.subscribe(params=>{
      this.ownerId = params[`id`] ; 
      this.check = this.formURLcheck(this.ownerId);
      console.log(this.check);
    });
    this.owner.disable() ; 
    if(this.check === false){
      console.log("this is add ");
      this.add ="new" ; 
      this.displayOwnerName();
    }else{
      this.route.queryParams.subscribe(params=>{
        this.ownerId=params['ownerId'];
        this.postId = params['postId']; 
        console.log(this.ownerId , "   " , this.postId);
        
        this.displayData() ; 
      })
    }
  }
  
  formURLcheck(ownerid:string):boolean{
    if(this.router.url ==`/post-form-component/${ownerid}?id=${ownerid}`){   
      this.check =false ; 
      return false; 
    }
      return true; 
  }

  onSubmit() {
    if(this.postForm.invalid){
      //this.formInvalid = true; 
      this.postForm.markAllAsTouched();
    }else{
      if(this.check === false && this.add === "new"){  
        this.createPost(this.Text.value as any , this.image.value as any, this.likes.value as any, this.tags.value as any);     
      }else{
        this.updatePost();
      }
    }
  }

  createPost(text:string, image:string, likes:number, tags:string[]):void{
    this.postService.creatPost({
      text,
      image,
      likes,
      tags,
      owner: this.ownerId,
    })
    .subscribe(
      data => this.successOperation(data),
      error => this.emailError(error)
    );
  }

  displayOwnerName(){
    this.userService.getUserById(this.ownerId).subscribe(responce=>{
      console.log(responce.firstName);
      this.postForm.patchValue({
        owner:responce.firstName,
      });
    });
  }

  displayData(){

    this.postService.getPostById(this.postId).subscribe(responce=> {
      //this.posts = responce.data ; 
      this.tags.clear(); 
      responce.tags.forEach(tag => { 
        
        this.displayTags(tag)
      });
      this.postForm.patchValue({
        Text : responce.text,
        image:responce.image , 
        likes:responce.likes ,
        //tags : responce.tags ,   
       // tags:responce.tags.forEach(tag=> this.displayTags(tag)) ,
        owner: responce.owner.firstName,   
      });
    });

  }
  
  updatePost(){
    console.log(this.postForm.value);
    this.postService.updatePost(this.postId,{
      text: this.Text.value,
      image: this.image.value,
      likes: this.likes.value,
      tags:this.tags.value,
      owner: this.ownerId,
    }as any).subscribe(
     data => this.successOperation(data),
     error => this.emailError(error)
    ); 
  }
  emailError(error:HttpErrorResponse)
  {
    console.log("email used before");
  }
  
  successOperation(data:PostCreate){
    this.success = true ;
      setTimeout(() => {
        this.back()
      }, 2000);
  }
  back(){
    this.location.back(); 
  }

  addTag(): void {
    this.tags.push(new FormControl(''));
  }
 
  displayTags(tag:String){
   // this.tags.get([tag]);
    console.log("fun:",this.tags);
    this.tags.push(new FormControl(tag));
  }
  removeTag(index: number): void {
    this.tags.removeAt(index);
  }
  
}
