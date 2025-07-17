import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product.model';
import { Productservices } from '../../services/productservices';
import { Filtrelemeservices } from '../../services/filtrelemeservices';
import { Router } from '@angular/router';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-card-component',
  standalone: true,
  imports: [
    Rating,
    FormsModule,
  ],
  templateUrl: './product-card-component.html',
  styleUrl: './product-card-component.css'
})
export class ProductCardComponent implements OnInit, OnDestroy {
  productListesi: Product[] = [];
  tumUrunler: Product[] = [];
  secilenKategoriler: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private productservices: Productservices,
    private router: Router,
    private filtrelemeServis: Filtrelemeservices
  ) {}

  ngOnInit(): void {
    // İlk olarak tüm ürünleri getir
    this.tumUrunleriGetir();

    // Kategori değişikliklerini dinle
    this.secilenKategorileriDinle();
  }

  tumUrunleriGetir(): void {
    this.productservices.urunlerGetir().subscribe((data: Product[]) => {
      this.tumUrunler = data;
      this.urunleriFiltreUygula(); // İlk yükleme sonrası filtre uygula
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

  urunleriFiltreUygula(): void {
    if (this.secilenKategoriler.length === 0) {
      // Hiç kategori seçilmemişse tüm ürünleri göster
      this.productListesi = [...this.tumUrunler];
    } else {
      // Seçilen kategorilere göre filtrele
      this.productListesi = this.tumUrunler.filter(product =>
        this.secilenKategoriler.includes(product.category)
      );
    }
    console.log("Filtrelenmiş ürün listesi:", this.productListesi);
  }

  goToProductDetail(id: number): void {
    this.router.navigate(['/productDetail', id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
