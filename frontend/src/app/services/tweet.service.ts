import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor() { }

  async getSentimentData(sv){
    
      const URL =environment.apiBaseUrl+'/tweets?tag=%23'+sv+'&maxTweets=10';
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      const request = new Request(URL, { method: 'GET', cache: 'reload', headers: headers });
      try {

        const fetchResult = fetch(request);
        const response = await fetchResult;
        const jsonData = await response.json();
        console.log(response);
        console.log(jsonData);
        return jsonData
      } catch(e){
        console.log(e)
        throw Error(e);

      }
    
  }
}
