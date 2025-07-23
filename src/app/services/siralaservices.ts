import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Siralaservices {

  private siralamaSubject = new Subject<void>();
  siralamaObservable$ = this.siralamaSubject.asObservable();

  siralamaTetikle() {
    this.siralamaSubject.next();
  }
}
