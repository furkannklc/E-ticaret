import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product.model';
import { Productservices } from '../../services/productservices';
import { Filtrelemeservices } from '../../services/filtrelemeservices';
import { Router } from '@angular/router';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import {Subject, Subscription, takeUntil} from 'rxjs';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Button} from 'primeng/button';
import {Siralaservices} from '../../services/siralaservices';

@Component({
  selector: 'app-product-card-component',
  standalone: true,
  imports: [
    Rating,
    FormsModule,
    ProgressSpinner,
    Button,
  ],
  templateUrl: './product-card-component.html',
  styleUrl: './product-card-component.css'
})

export class ProductCardComponent implements OnInit, OnDestroy {

  productListesi: Product[] = [];
  productListesiydk: Product[] = [];
  tumUrunler: Product[] = [];
  secilenKategoriler: string[] = [];
  sortOrder:number = 1;
  loading:boolean = false;
  subscription: Subscription = new Subscription();
  private destroy$ = new Subject<void>();

  constructor(
    private productservices: Productservices,
    private router: Router,
    private filtrelemeServis: Filtrelemeservices,private siralaservices : Siralaservices
  ) {}

  ngOnInit(): void {
    this.tumUrunleriGetir();
    this.secilenKategorileriDinle();
    this.urunleriIsmeGOreFiltrele()

    this.subscription = this.siralaservices.siralamaObservable$.subscribe(() => {
      this.urunleriIsmeGoreSirala();  // burası senin sıralama fonksiyonun
    });
  }

  tumUrunleriGetir(): void {
    this.loading = true;
    this.productservices.urunlerGetir().subscribe((data: Product[]) => {
      this.tumUrunler = data;
      this.urunleriFiltreUygula();
      this.loading = false;
    });
  }

  secilenKategorileriDinle(): void {
    this.filtrelemeServis.secilenKategoriler$
      .pipe(takeUntil(this.destroy$))
      .subscribe((kategoriler) => {
        this.secilenKategoriler = kategoriler;
        console.log("Seçilen kategoriler güncellendi:", this.secilenKategoriler);
        this.urunleriFiltreUygula(); // Her kategori değişikliğinde filtre uygula
      });
  }
  urunleriIsmeGOreFiltrele(): void {

    this.filtrelemeServis.arama$.subscribe((aranan) => {
      this.productListesi = this.productListesiydk.filter(urun =>
        urun.title.toLowerCase().includes(aranan.toLowerCase())
      );
    });
  }

  urunleriFiltreUygula(): void {
    if (this.secilenKategoriler.length === 0) {
      this.productListesi = [...this.tumUrunler];
    } else {
      this.productListesi = this.tumUrunler.filter(product =>
        this.secilenKategoriler.includes(product.category)
      );

    }
    this.productListesiydk= [...this.productListesi];
    this.urunleriIsmeGOreFiltrele()
    console.log("Filtrelenmiş ürün listesi:", this.productListesi);
  }

  goToProductDetail(id: number): void {
    this.router.navigate(['/productDetail', id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription.unsubscribe();

  }

  urunleriIsmeGoreSirala(): void {
    this.sortOrder = -1*this.sortOrder; // Yönü tersine çevir
    this.productListesi.sort((a, b) => {
      return (a.price - b.price) * this.sortOrder;
    });
  }

}
