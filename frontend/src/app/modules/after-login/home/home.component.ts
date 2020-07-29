import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  clickEventsubscription:Subscription;

  constructor(private sharedService:SharedService) {
    this.clickEventsubscription=this.sharedService.scrolltoSection.subscribe(id=>{
      console.log(id)
      this.scrollToElement(id);
      })
   }

  ngOnInit() {
  }
  scrollToElement(id): void {
    var ele=document.getElementById(id);
    ele.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
