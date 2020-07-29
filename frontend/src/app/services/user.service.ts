import { Injectable } from '@angular/core';
import { User } from '../models/user.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    name: '',
    email: '',
    password: '',
  }

  noAuthHeader = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'NoAuth':'True'
    })
  };

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/auth/signup', user, this.noAuthHeader)
  }

  login(authcreds) {
    return this.http.post(environment.apiBaseUrl + '/auth/login', authcreds, this.noAuthHeader)
  }








  getToken() {
    return localStorage.getItem('token')
  }

  setToken(token: string) {
    localStorage.setItem('token', token)
  }
  setUser(username){
    console.log(username)
    localStorage.setItem('username',username)
  }
  getUserName(){
    return localStorage.getItem('username')
  }

  deleteToken() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    
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

  getHistory(){
    return this.http.get(environment.apiBaseUrl + '/users')
  }


}
