import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SepeteEklenenModel} from '../models/sepeteEklenen.model';

@Injectable({
  providedIn: 'root'
})
export class Sepetservices {
  private miktar =new BehaviorSubject<number>(0);
  miktar$ = this.miktar.asObservable();

  sepeteEkle(gelenurun:SepeteEklenenModel){
    const currentCount = this.miktar.value;
    this.miktar.next(currentCount + 1);
  }

}
