import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Filtrelemeservices {
  private secilenKategoriSubject = new BehaviorSubject<string[]>([]);
  secilenKategoriler$ = this.secilenKategoriSubject.asObservable();

  setSecilenKategori(kategoriler: string[]) {
    this.secilenKategoriSubject.next(kategoriler);
    console.log('Servise gelen kategoriler:', kategoriler);
  }

  getSecilenKategori(): string[] {
    return this.secilenKategoriSubject.value;
  }
}
