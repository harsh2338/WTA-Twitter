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
import {AuthGuard} from '../app/modules/auth/auth.guard'
import { UserService } from './services/user.service';

import {AuthInterceptor} from './modules/auth/auth.interceptor';
import { HomeComponent } from './modules/after-login/home/home.component';
import { SearchComponent } from './modules/after-login/search/search.component';
import { HeaderComponent } from './modules/after-login/home/header/header.component'


import { StickyNavModule } from 'ng2-sticky-nav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material/dialog';
import { LiveComponent } from './modules/after-login/live/live.component';
import { HistoryComponent } from './modules/after-login/history/history.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    UserComponent,
    SignUpComponent,
    HomeComponent,
    SearchComponent,
    HeaderComponent,
    LiveComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StickyNavModule,
    MatDialogModule,
    BrowserAnimationsModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },AuthGuard,UserService],
  bootstrap: [AppComponent],
  entryComponents:[UserComponent],
})
export class AppModule { }
