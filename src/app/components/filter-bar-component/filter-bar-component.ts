import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {Productservices} from '../../services/productservices';
import {Subject, takeUntil} from 'rxjs';
import {Filtrelemeservices} from '../../services/filtrelemeservices';
import {FormsModule} from '@angular/forms';
import {AutoComplete} from 'primeng/autocomplete';
import {MultiSelect} from 'primeng/multiselect';
import {Select} from 'primeng/select';
@Component({
  selector: 'app-filter-bar-component',
  imports: [
    Button,
    FormsModule,
    AutoComplete,
    MultiSelect,
    Select
  ],
  templateUrl: './filter-bar-component.html',
  styleUrl: './filter-bar-component.css'
})
export class FilterBarComponent implements OnInit {
  kategoriler: string[] = [];
  secilenKategoriler: string[] = [];

  private destroy$ = new Subject<void>();

  constructor(private urunServis:Productservices,
              private filtrelemeServis: Filtrelemeservices
  ) {}

    ngOnInit(): void {
      this.urunServis.kategorileriGetir().subscribe(kategoriler => {
        this.kategoriler = kategoriler;
        console.log("Kategoriler:", this.kategoriler);
      });

      this.filtrelemeServis.secilenKategoriler$
        .pipe(takeUntil(this.destroy$))
        .subscribe((kategoriler) => {
          this.secilenKategoriler = kategoriler;
        });
    }
  kategoriSecildi(kategori: string) {
    const index = this.secilenKategoriler.indexOf(kategori);
    if (index > -1) {
      this.secilenKategoriler.splice(index, 1);
    } else {
      this.secilenKategoriler.push(kategori);
    }
    this.filtrelemeServis.setSecilenKategori([...this.secilenKategoriler]);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  kategoriDegisti(secilen: string[]) {
    this.secilenKategoriler = secilen;
    this.filtrelemeServis.setSecilenKategori([...secilen]);
  }
}
