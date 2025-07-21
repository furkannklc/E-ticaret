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
import { Router } from '@angular/router';
import {ProgressSpinner} from 'primeng/progressspinner';
@Component({
  selector: 'app-detail-component',
  imports: [
    FormsModule,
    Rating,
    Toast,
    Ripple,
    AutoCompleteModule,
    ProgressSpinner
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
    { name: 'XS', value: 'XS' },
    { name: 'S', value: 'S' },
    { name: 'M', value: 'M' },
    { name: 'L', value: 'L' },
    { name: 'XL', value: 'XL' }
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
  sepeteEklenecekUrun = new SepeteEklenenModel();
  loading: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private urunServis:Productservices,
    private messageService: MessageService,
    private sepetservices : Sepetservices,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.urunId = +idParam;
        console.log("Ürün ID:", this.urunId);
      }
    })
    this.getUrunDetay();
  }

  private getUrunDetay(): void {
    this.loading = true;
    this.selectedSize= '';
    this.selectedColor = '';
    this.selectedQuantity= 0;
    this.urunServis.urunGetir(this.urunId).subscribe({
      next: (data: Product) => {
        this.urun = data;
        this.loading = false;
        console.log("Ürün Detay:", this.urun);
      },
      error: (error) => {
        console.error('Ürün yüklenirken hata:', error);
        this.loading = false; // Hata durumunda da loading'i bitir
      }
    });
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
      this.esitle()
      this.sepetservices.sepeteEkle(this.sepeteEklenecekUrun)
      this.messageService.add({ severity: 'success', summary: 'Ürün Sepete Eklendi', detail: 'Ürününüz başar ile eklendi', key: 'br', life: 3000 });
      this.getUrunDetay()
    }


  }
  esitle(){
    this.sepeteEklenecekUrun = new SepeteEklenenModel();
    this.sepeteEklenecekUrun.id = this.urunId;
    this.sepeteEklenecekUrun.color = this.selectedColor;
    this.sepeteEklenecekUrun.size = this.selectedSize;
    this.sepeteEklenecekUrun.count = this.selectedQuantity;
    this.sepeteEklenecekUrun.title = this.urun.title;
    this.sepeteEklenecekUrun.price = this.urun.price;
    this.sepeteEklenecekUrun.description = this.urun.description;
    this.sepeteEklenecekUrun.category = this.urun.category;
    this.sepeteEklenecekUrun.image = this.urun.image;
    this.sepeteEklenecekUrun.rating = this.urun.rating;
  }
  search(event: AutoCompleteCompleteEvent) {
    this.items = Array.from({ length: 31 }, (_, i) => i);
  }
}
