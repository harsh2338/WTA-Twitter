import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {UserService} from './user.service'

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private http: HttpClient , private userService:UserService) { }

   getSentimentData(sv,maxTweets){
    
      const URL =environment.apiBaseUrl+'/tweets?tag=%23'+sv+'&maxTweets='+maxTweets;
      // const headers = new Headers();
      // headers.append('Accept', 'application/json');
      // const request = new Request(URL, { method: 'GET', cache: 'reload', headers: headers });
      // try {
      //   const fetchResult = fetch(request);
      //   const response = await fetchResult;
      //   const jsonData = await response.json();
      //   return jsonData
      // } catch(e){
      //   console.log(e)
      //   throw Error(e);
      // }
      return this.http.get(URL);
  //     try {
  //         const fetchResult = this.http.get(URL);
  //         fetchResult.subscribe(async (response)=>{


  //           const jsonData = await response;
  //           console.log(typeof response)
  //           console.log(response)
  //           return jsonData

  //         })
  //       } catch(e){
  //         console.log(e)
  //         throw Error(e);
  //       }
  // }
}
}
