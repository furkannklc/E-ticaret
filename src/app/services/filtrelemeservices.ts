import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Filtrelemeservices {
  private secilenKategoriSubject = new BehaviorSubject<string[]>([]);
  secilenKategoriler$ = this.secilenKategoriSubject.asObservable();

  private aranacakUrunSubject = new BehaviorSubject<string>('');
  arama$ =this.aranacakUrunSubject.asObservable();

  guncelleArama(deger: string) {
    this.aranacakUrunSubject.next(deger);
  }

  setSecilenKategori(kategoriler: string[]) {
    this.secilenKategoriSubject.next(kategoriler);
    console.log('Servise gelen kategoriler:', kategoriler);
  }

  getSecilenKategori(): string[] {
    return this.secilenKategoriSubject.value;
  }
}
