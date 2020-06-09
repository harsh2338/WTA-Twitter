import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service'
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
    console.log("History")
    this.userService.getHistory().subscribe((data)=>{
      console.log(data)
    })
    
  }

}
