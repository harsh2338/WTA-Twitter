import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  hashTag:any='#tweet';
  constructor() { }

  ngOnInit() {
  }
  search(hashTag){
    this.hashTag=hashTag
    console.log(this.hashTag)
  }

}
