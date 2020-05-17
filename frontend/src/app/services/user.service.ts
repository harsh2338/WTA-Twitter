import { Injectable } from '@angular/core';
import { User } from '../models/user.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    username: '',
    email: '',
    password: '',
  }

  noAuthHeader = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
    })
  };

  constructor(private http: HttpClient) { }

  GetPost(){
    return  fetch(environment.apiBaseUrl + '/tweets?tag=%23corona&maxTweets=10');

  }
  registerUser(user: User) {
    // fetch(environment.apiBaseUrl + '/signup', { mode: 'no-cors' });
    return this.http.get(environment.apiBaseUrl+'/tweets?tag=%23corona&maxTweets=10')
    // return this.http.post(environment.apiBaseUrl + '/signup', user, this.noAuthHeader)
  }

  login(authcreds) {
    return this.http.post(environment.apiBaseUrl + '/login', authcreds, this.noAuthHeader)
  }


  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/profile');
  }

  getToken() {
    return localStorage.getItem('token')
  }

  setToken(token: string) {
    localStorage.set('token', token)
  }

  deleteToken() {
    localStorage.removeItem('token')
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1])
      return JSON.parse(userPayload)
    }
    else {
      return null
    }
  }
  isLoggedIn() {
    var userPayload = this.getUserPayload()
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000
    }
    else
      return false
  }



}
