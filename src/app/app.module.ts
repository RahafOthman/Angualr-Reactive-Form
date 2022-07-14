import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UsersComponent } from './users/users.component';
import { FormComponent } from './form/form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { PostFormComponent } from './post-form/post-form.component';
import { CommonModule } from '@angular/common';   
import { DetailsComponent } from './details/details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    UsersComponent,
    FormComponent,
    PageNotFoundComponent,
    PostFormComponent,
    DetailsComponent,
    UserDetailsComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
