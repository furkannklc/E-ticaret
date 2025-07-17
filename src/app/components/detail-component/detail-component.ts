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
import {AutoCompleteCompleteEvent, AutoCompleteModule} from 'primeng/autocomplete';
import {Sepetservices} from '../../services/sepetservices';
import {SepeteEklenenModel} from '../../models/sepeteEklenen.model';
@Component({
  selector: 'app-detail-component',
  imports: [
    FormsModule,
    Rating,
    Toast,
    Ripple,
    AutoCompleteModule
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

  urun!:Product;

  urunId!: number ;
  items: any[] = [];
  selectedSize: string = '';
  selectedColor: string = '';
  selectedQuantity: number = 0;


  constructor(
    private route: ActivatedRoute,
    private urunServis:Productservices,
    private messageService: MessageService,private sepetservices : Sepetservices) { }

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

  selectColor(color: string) {
    this.selectedColor = color;
  }

  isSelected(color: string): boolean {
    return this.selectedColor === color;
  }

  showBottomRight() {

    if (!this.selectedColor || !this.selectedSize || this.selectedQuantity <= 0) {
      this.messageService.add({ severity: 'info', summary: 'Uyarı', detail: 'Sepete eklemek için lütfen renk ve beden seçiniz.', key: 'br', life: 3000 });
      return;
    }
    else{
      const sepeteEklenecekUrun = new SepeteEklenenModel();
      sepeteEklenecekUrun.id = this.urunId;
      sepeteEklenecekUrun.color = this.selectedColor;
      sepeteEklenecekUrun.size = this.selectedSize;
      sepeteEklenecekUrun.count = this.selectedQuantity;
      this.sepetservices.sepeteEkle(sepeteEklenecekUrun)
      this.messageService.add({ severity: 'success', summary: 'Ürün Sepete Eklendi', detail: 'Ürününüz başar ile eklendi', key: 'br', life: 3000 });
    }

    console.log("sdfdfsd"+this.selectedQuantity)

  }

  search(event: AutoCompleteCompleteEvent) {
    this.items = Array.from({ length: 31 }, (_, i) => i);
  }
}
