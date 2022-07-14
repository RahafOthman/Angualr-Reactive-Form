import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Post, PostCreate, PostPreview } from '../moduls/user-post.module';
import { List } from '../moduls/users.module';

@Injectable({
  providedIn: 'root'
})
export class UserPostService {

  baseURL = 'https://dummyapi.io/data/v1/' ;
  options={
    headers : new HttpHeaders().set('app-id','62b95172e20e2d659edfc3db')
  } 
  constructor(private http:HttpClient) { }

  getPost():Observable<List<PostPreview>>{
    console.log("this is post service");
    return this.http.get<List<PostPreview>>(`${this.baseURL}post`, {...this.options,
      params : {created:1}}).pipe(
        catchError(this.errorHandlar)
      );
  }

  getPostByUser(id:string):Observable<List<PostPreview>>{
    return this.http.get<List<PostPreview>>(`${this.baseURL}user/${id}/post`,{...this.options});
  }
  
  getPostById(id:string):Observable<Post>{
    return this.http.get<Post>(`${this.baseURL}post/${id}`, {...this.options});
  }

  deletePost(id:string):Observable<object>{
    console.log(id);
    return this.http.delete(`${this.baseURL}post/${id}`,{...this.options}).pipe(
      catchError(this.errorHandlar)
    );
  }

  creatPost(post:PostCreate):Observable<PostCreate>{
    console.log(post);
    console.log("this is post service ");
    return this.http.post<PostCreate>(`${this.baseURL}post/create`,post,{...this.options}).pipe(
      catchError(this.errorHandlar)
    );
  }

  updatePost(id:string,post:PostCreate):Observable<PostCreate>{
    console.log(id,post);
   
    return this.http.put<PostCreate>(`${this.baseURL}post/${id}`,post , {...this.options}).pipe(
      catchError(this.errorHandlar)
    );
  }
  
  errorHandlar(error:HttpErrorResponse):Observable<never>{
    console.log("error");
    return throwError('Some Error Occured');
  }

}
