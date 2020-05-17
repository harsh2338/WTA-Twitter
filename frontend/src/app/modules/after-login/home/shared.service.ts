import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  scrolltoSection = new Subject<any>();
  constructor() { }
}

