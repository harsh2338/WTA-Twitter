import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../../services/web-socket.service'

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

  hashTag:string;
  handle: string;
  tweet: string;
  output: any[] = [];

  totScore = 0;
  positives = 0;
  negatives = 0;
  neutrals = 0;
  offset = 0.1;

  constructor( private webSocketService: WebSocketService ) { }

  ngOnInit() {

    this.webSocketService.listen('tweets').subscribe((data) => this.updateTweets(data));
  }
  updateTweets(data:any) {
    if(!!!data) return;


    this.totScore += data.tweet.score.comparative;
    this.totScore.toFixed(3)
    if (data.tweet.score.comparative > this.offset) 
      this.positives++;
    else if (data.tweet.score.comparative < 0) 
      this.negatives++;
    else 
      this.neutrals++;
    console.log(data)
    this.output.unshift(data);
  }

  
  setStream(): void {
    this.webSocketService.emit('setStream', this.hashTag);
    this.totScore = 0;
    this.positives = 0;
    this.negatives = 0;
    this.neutrals = 0;
  }

  disconnect(){

    this.webSocketService.socket.disconnect();
  }
  reconnect() {
    this.output=[]
    this.webSocketService.socket.connect();
    this.setStream();
}
  
}
