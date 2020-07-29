import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SignInComponent } from 'src/app/modules/user/sign-in/sign-in.component';
import { UserComponent } from 'src/app/modules/user/user.component';
import { UserService } from '../../../../services/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private sharedService: SharedService,
    private dialog: MatDialog,
    private userService: UserService,
    private router : Router
    ) { }
    username;
  ngOnInit() {
    this.username=this.userService.getUserName()
  }
  moveToSection(id) {
    console.log(id)
    this.sharedService.scrolltoSection.next(id);
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login'])
  }
  onLogin(){
    this.router.navigate(['/login'])
  }
  onSignup(){
    this.router.navigate(['/signup'])
  }
  isLoggedIn(){
    return ! this.userService.isLoggedIn()
  }
  showHistory(){
    this.router.navigate(['/history'])
  }


}
