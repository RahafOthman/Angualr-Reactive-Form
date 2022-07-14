import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: 'home-component', component:HomeComponent},
  {path:'users-component' , component:UsersComponent},
  {path:'about-us-component',component:AboutUsComponent},
  {path:'form-component' ,component:FormComponent},
  {path:'form-component/:id',component:FormComponent },
 // {path:'post-component/:id' , component:PostsComponent},
  {path:'post-form-component/:id' , component:PostFormComponent },
  {path:'post-form-component/:id/:postid' , component:PostFormComponent },
  {path:'post-component/:id', component:PostComponent},

  {
    path:'user-details-component/:id',
    component:UserDetailsComponent,
    children:[
      {
        path:'details-component',
        component:DetailsComponent,
      },
      {
        path:'post-component',
        component:PostsComponent
      },
      {
        path:'post-component/:id' , component:PostsComponent,
        children:[
          { 
            path:'post-form-component/:id' , 
            component:PostFormComponent,
          } ,
        ]
      }
    ]
  },
  {path:'', redirectTo :'home-component', pathMatch:'full'},
  {path:'**' , component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
