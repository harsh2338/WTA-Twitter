import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SignInComponent } from 'src/app/modules/user/sign-in/sign-in.component';
import { UserComponent } from 'src/app/modules/user/user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private sharedService:SharedService,
    private dialog:MatDialog) { }

  ngOnInit() {
  }
  moveToSection(id){
    console.log(id)
    this.sharedService.scrolltoSection.next(id);
  }
  // signIn(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = "60%";
  //   this.dialog.open(UserComponent,dialogConfig);
  // }
  

}
