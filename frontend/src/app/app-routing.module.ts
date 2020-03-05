import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './modules/user/sign-in/sign-in.component';
import { SignUpComponent } from './modules/user/sign-up/sign-up.component';

import { UserComponent } from './modules/user/user.component';
import {UserProfileComponent} from './modules/user-profile/user-profile.component';

import {AuthGuard} from '../app/modules/auth/auth.guard'

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},

  {
    path:'login',component:UserComponent,
    children:[{path:'',component:SignInComponent}]
  },
  {
    path:'signup',component:UserComponent,
    children:[{path:'',component:SignUpComponent}]
  },
  {
    path:'profile',component:UserProfileComponent,
    canActivate:[AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
