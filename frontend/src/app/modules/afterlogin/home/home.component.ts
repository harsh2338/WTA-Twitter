import { Component, OnInit, Directive, Input, ElementRef, HostListener  } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit() {

  //   $(document).ready(function(){
  //     $("a").on('click', function(event) {
    
  //       if (this.hash !== "") {
  //         event.preventDefault();
    
  //         // Store hash
  //         var hash = this.hash;
    
  //         // Using jQuery's animate() method to add smooth page scroll
  //         // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
  //         $('html, body').animate({
  //           scrollTop: $(hash).offset().top
  //         }, 800, function(){
       
  //           // Add hash (#) to URL when done scrolling (default click behavior)
  //           window.location.hash = hash;
  //         });
  //       } // End if
  //     });
  //   });
  }

}
