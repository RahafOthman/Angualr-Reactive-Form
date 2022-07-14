import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostPreview } from '../moduls/user-post.module';
import { UserPostService } from '../services/user-post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts!:PostPreview[];
  id!:string;
  postId!:string; 
  
  constructor(private postService:UserPostService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.id = params[`id`];
    })
    this.getPost();
  }

  getPost():void{ 
    this.postService.getPostByUser(this.id).subscribe(responce=> {
      this.posts = responce.data ; 
      console.log(this.posts);
    });
  }

  createPost():void{
    const id = this.id  ; 
    this.router.navigate(['post-form-component', `${this.id}`], {queryParams:{id}});
    //owner id 
  }

  deletePost(id:string):void{
    this.postService.deletePost(id).subscribe(responce=>{
      console.log(responce);
      this.getPost(); 
    })
  }

  toUpdate(id:string):void{
    //post id 
    const ownerId = this.id  ; 
    console.log("id from post:"+ id);
    this.router.navigate(['post-form-component', `${ownerId}`], {queryParams:{ postId: id, ownerId: ownerId}});
  }
  

}
