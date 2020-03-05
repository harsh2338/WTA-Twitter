import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './modules/user/sign-in/sign-in.component';
import { UserComponent } from './modules/user/user.component';
import { SignUpComponent } from './modules/user/sign-up/sign-up.component';
import { from } from 'rxjs';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';
import {AuthGuard} from '../app/modules/auth/auth.guard'
import { UserService } from './services/user.service';

import {AuthInterceptor} from './modules/auth/auth.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
