import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Productservices} from '../../services/productservices'; // Adjust the import path as necessary
import {Product} from '../../models/product.model';
import {RadioButton} from 'primeng/radiobutton';
import {FormsModule} from '@angular/forms';
import {Rating} from 'primeng/rating';
import {InputNumber} from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import {Toast} from 'primeng/toast';
import {Ripple} from 'primeng/ripple';
@Component({
  selector: 'app-detail-component',
  imports: [
    RadioButton,
    FormsModule,
    Rating,
    InputNumber,
    Toast,
    Ripple
  ],
  templateUrl: './detail-component.html',
  styleUrl: './detail-component.css',
})
export class DetailComponent implements OnInit {
  colors = [
    { name: 'red', bg: 'bg-red-500', activeBg: 'bg-red-600', hover: 'hover:bg-red-600', ring: 'ring-red-300' },
    { name: 'blue', bg: 'bg-blue-500', activeBg: 'bg-blue-600', hover: 'hover:bg-blue-600', ring: 'ring-blue-300' },
    { name: 'green', bg: 'bg-green-500', activeBg: 'bg-green-600', hover: 'hover:bg-green-600', ring: 'ring-green-300' },
    { name: 'yellow', bg: 'bg-yellow-500', activeBg: 'bg-yellow-600', hover: 'hover:bg-yellow-600', ring: 'ring-yellow-300' },
    { name: 'gray', bg: 'bg-gray-500', activeBg: 'bg-gray-600', hover: 'hover:bg-gray-600', ring: 'ring-gray-300' }
  ];
  sizes = [
    { name: 'XS', value: 'xs' },
    { name: 'S', value: 's' },
    { name: 'M', value: 'm' },
    { name: 'L', value: 'l' },
    { name: 'XL', value: 'xl' }
  ];
  selectSize(sizeValue: string) {
    this.selectedSize = sizeValue;
  }
  isSizeSelected(sizeValue: string): boolean {
    return this.selectedSize === sizeValue;
  }
  urunId!: number ;
  selectedColor: string = '';
  selectedSize: string = '';
  urun!:Product;
  constructor(private route: ActivatedRoute,private urunServis:Productservices,private messageService: MessageService) { }
  renkler: string[] = ['Kırmızı', 'Mavi', 'Yeşil', 'Sarı', 'Beyaz'];
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.urunId = +idParam;
        console.log("Ürün ID:", this.urunId);
      }
    })
     this.urunServis.urunGetir(this.urunId).subscribe((data: Product) => {
      this.urun = data;
      console.log("Ürün Detay:", this.urun);
    })
  }
  renk(renk: string) {
    console.log("Seçilen Renk:", renk);
  }
  sepeteGit(){

  }
  selectColor(color: string) {
    this.selectedColor = color;
  }

  // Seçili mi kontrol eden fonksiyon
  isSelected(color: string): boolean {
    return this.selectedColor === color;
  }

  showBottomRight() {
    this.messageService.add({ severity: 'success', summary: 'Ürün Sepete Eklendi', detail: 'Ürününüz başar ile eklendi', key: 'br', life: 3000 });
  }
}

