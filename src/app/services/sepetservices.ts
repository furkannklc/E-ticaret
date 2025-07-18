import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SepeteEklenenModel } from '../models/sepeteEklenen.model';

@Injectable({
  providedIn: 'root'
})
export class Sepetservices {
  private miktar = new BehaviorSubject<number>(0);
  miktar$ = this.miktar.asObservable();

  private sepettekiUrunler: SepeteEklenenModel[] = [];
  private sepettekiUrunlerSubject = new BehaviorSubject<SepeteEklenenModel[]>([]);
  sepettekiUrunler$ = this.sepettekiUrunlerSubject.asObservable();

  constructor() {
    // Sayfa yüklendiğinde localStorage'dan veri yükle
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const savedCart = localStorage.getItem('sepetUrunleri');
    if (savedCart) {
      this.sepettekiUrunler = JSON.parse(savedCart);
      this.miktar.next(this.sepettekiUrunler.length);
      this.sepettekiUrunlerSubject.next(this.sepettekiUrunler);
    }
  }

  private saveToStorage(): void {
    localStorage.setItem('sepetUrunleri', JSON.stringify(this.sepettekiUrunler));
  }

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
    }

    this.miktar.next(this.sepettekiUrunler.length);
    this.sepettekiUrunlerSubject.next(this.sepettekiUrunler);

    // Değişiklikleri localStorage'a kaydet
    this.saveToStorage();
  }

  sepettenCikar(id: number, size: string, color: string): boolean {
    const index = this.sepettekiUrunler.findIndex(item =>
      item.id === id && item.size === size && item.color === color
    );

    if (index !== -1) {
      this.sepettekiUrunler.splice(index, 1);
      this.miktar.next(this.sepettekiUrunler.length);
      this.sepettekiUrunlerSubject.next(this.sepettekiUrunler);
      this.saveToStorage();
      return true; // Silme başarılı
    }
    return false; // Silme başarısız
  }

  updateQuantity(id: number, size: string, color: string, newQuantity: number): void {
    const urun = this.sepettekiUrunler.find(item =>
      item.id === id && item.size === size && item.color === color
    );

    if (urun && newQuantity >= 1 && newQuantity <= 30) {
      urun.count = newQuantity;
      this.sepettekiUrunlerSubject.next(this.sepettekiUrunler);
      this.saveToStorage();
    }
  }

  sepetiBosalt(): void {
    this.sepettekiUrunler = [];
    this.miktar.next(0);
    this.sepettekiUrunlerSubject.next([]);
    localStorage.removeItem('sepetUrunleri');
  }

  getSepettekiUrunler(): SepeteEklenenModel[] {
    return this.sepettekiUrunler;
  }
}
