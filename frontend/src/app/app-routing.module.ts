import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './modules/user/sign-in/sign-in.component';
import { SignUpComponent } from './modules/user/sign-up/sign-up.component';

import { UserComponent } from './modules/user/user.component';
import {HomeComponent} from './modules/after-login/home/home.component';
import {AuthGuard} from '../app/modules/auth/auth.guard'
import {SearchComponent} from '../app/modules/after-login/search/search.component';
import { LiveComponent } from './modules/after-login/live/live.component';
import { HistoryComponent } from './modules/after-login/history/history.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},

  {
    path:'login',component:UserComponent,
    children:[{path:'',component:SignInComponent}]
  },
  {
    path:'signup',component:UserComponent,
    children:[{path:'',component:SignUpComponent}]
  },
  {
    path:'home',component:HomeComponent,
    
  },
  {
    path:'search',component:SearchComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'live',component:LiveComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'history',component:HistoryComponent,
    canActivate:[AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
