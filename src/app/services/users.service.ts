import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  catchError, Observable, throwError } from 'rxjs';
import { CreateUserModel, List, UserFull, UserPreview } from '../moduls/users.module';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  baseURL = 'https://dummyapi.io/data/v1/' ;
  options={
    headers : new HttpHeaders().set('app-id','62b95172e20e2d659edfc3db')
  } 
  constructor(private http:HttpClient) { }

  getUsers():Observable<List<UserPreview>>{
    console.log("this is get function");
    return this.http.get<List<UserPreview>>(`${this.baseURL}user`, {...this.options,
      params: { created:1 } }).pipe(
        catchError(this.errorHandlar)
      );
  }
  getUserById(id:string):Observable<UserFull>{
    return this.http.get<UserFull>(`${this.baseURL}user/${id}`,{...this.options}).pipe(
      catchError(this.errorHandlar)
    );
  }
  deleteUser(id:string):Observable<object>{
    return this.http.delete(`${this.baseURL}user/${id}`,{...this.options}).pipe(
      catchError(this.errorHandlar)
    );
  }
  creatUser(user:CreateUserModel):Observable<UserFull>{

    return this.http.post<UserFull>(`${this.baseURL}user/create`,user,{...this.options}).pipe(
      catchError(this.errorHandlar)
    );
  }
  updateUser(id:string, user:UserPreview):Observable<UserFull>{
    console.log(id,user);
    
    return this.http.put<UserFull>(`${this.baseURL}user/${id}`,user , {...this.options}).pipe(
      catchError(this.errorHandlar)
    );
  }
  updateFullUser(id:string, user:UserFull):Observable<UserFull>{
    console.log(id,user);
    
    return this.http.put<UserFull>(`${this.baseURL}user/${id}`,user , {...this.options}).pipe(
      catchError(this.errorHandlar)
    );
  }
  errorHandlar(error:HttpErrorResponse):Observable<never>{
    console.log("error");
    return throwError(error);

  }

}
