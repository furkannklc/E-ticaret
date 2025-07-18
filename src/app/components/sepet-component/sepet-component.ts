import { Component, OnInit } from '@angular/core';
import { Sepetservices } from '../../services/sepetservices';
import { SepeteEklenenModel } from '../../models/sepeteEklenen.model';
import { Productservices } from '../../services/productservices';
import { Product } from '../../models/product.model';
import {AutoComplete, AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';
import { MessageService } from 'primeng/api';
import {Toast} from 'primeng/toast';
import {ProgressSpinner} from 'primeng/progressspinner';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sepet-component',
  templateUrl: './sepet-component.html',
  imports: [
    AutoComplete,
    FormsModule,
    Toast,
    ProgressSpinner,
    RouterLink
  ],
  styleUrls: ['./sepet-component.css']
})
export class SepetComponent implements OnInit {
  sepetUrunleri: SepeteEklenenModel[] = [];
  tumUrunlar: Product[] = [];
  miktar!: number;
  toplamFiyati: number = 0;
  quantityItems: number[] = [];
  loading:boolean = false;
  constructor(private sepetservices: Sepetservices, private productservis: Productservices , private messageService :MessageService) {}

  ngOnInit() {
      this.loading=true
      this.sepetservices.sepettekiUrunler$.subscribe(data => {
      this.sepetUrunleri = data;
      this.miktar = this.sepetUrunleri.length;
      this.toplamFiyat();
      this.loading=false
    });

  }

  toplamFiyat(): void {
    this.toplamFiyati = this.sepetUrunleri.reduce((total, urun) => {
      return total + (urun.price * urun.count);
    }, 0);
    console.log("Toplam fiyat: " + this.toplamFiyati);
  }

  getTotalPrice(): number {
    return this.toplamFiyati;
  }

  urunuSil(id: number, size: string, color: string): void {
    const success=this.sepetservices.sepettenCikar(id, size, color);
    console.log(success);
   if(success){
     this.messageService.add({ severity: 'success', summary: 'Uyarı', detail: 'Ürününüz sepeten silinmiştir.', key: 'br', life: 3000 });
   }
  }

  sepetiBosalt(): void {
    this.sepetservices.sepetiBosalt();
    this.messageService.add({ severity: 'success', summary: 'Uyarı', detail: 'Ürünleriniz sepetten silinmiştir.', key: 'br', life: 3000 });
  }

  // Quantity autocomplete için
  searchQuantity(event: AutoCompleteCompleteEvent) {
    // 1'den 30'a kadar sayılar
    this.quantityItems = Array.from({ length: 30 }, (_, i) => i + 1);
  }

  // Ürün miktarını güncelle
  updateQuantity(urun: SepeteEklenenModel, newQuantity: number) {
    if (newQuantity >= 1 && newQuantity <= 30) {
      // Servis üzerinden güncelleme yap
      this.sepetservices.updateQuantity(urun.id, urun.size, urun.color, newQuantity);
    }
  }

}
