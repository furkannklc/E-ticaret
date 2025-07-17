import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SepeteEklenenModel} from '../models/sepeteEklenen.model';

@Injectable({
  providedIn: 'root'
})
export class Sepetservices {
  private miktar =new BehaviorSubject<number>(0);
  miktar$ = this.miktar.asObservable();

  private sepettekiUrunler: SepeteEklenenModel[] = [];

  sepeteEkle(yeniUrun: SepeteEklenenModel): void {
    const mevcut = this.sepettekiUrunler.find(item =>
      item.id === yeniUrun.id &&
      item.size === yeniUrun.size &&
      item.color === yeniUrun.color
    );
    if (mevcut) {
      mevcut.count += yeniUrun.count;
    } else {
      this.sepettekiUrunler.push({ ...yeniUrun });
      this.miktar.next(this.sepettekiUrunler.length);

    }
  }


  // sepeteEkle(gelenurun:SepeteEklenenModel){
  //   const currentCount = this.miktar.value;
  //   this.miktar.next(currentCount + 1);
  // }

}
