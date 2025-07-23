import { Component, OnInit, OnDestroy } from '@angular/core';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { Productservices } from '../../services/productservices';
import { Router } from '@angular/router';
import { Filtrelemeservices } from '../../services/filtrelemeservices';
import { Subject, takeUntil } from 'rxjs';
import {Button} from 'primeng/button';
import {NgStyle} from '@angular/common';
import {AutoComplete} from 'primeng/autocomplete';
import {MultiSelect} from 'primeng/multiselect';

@Component({
  selector: 'app-filter-component',
  imports: [Checkbox, FormsModule, Button, NgStyle, AutoComplete, MultiSelect],
  templateUrl: './filter-component.html',
  styleUrl: './filter-component.css'
})
export class FilterComponent implements OnInit, OnDestroy {
  kategoriler: string[] = [];
  secilenKategoriler: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private urunServis: Productservices,
    private filtrelemeServis: Filtrelemeservices
  ) {}

  ngOnInit(): void {
    this.urunServis.kategorileriGetir().subscribe((data: any) => {
      this.kategoriler = data;
      console.log("sdfsfdfdsf"+this.kategoriler)
    });

    // Servisteki mevcut seçilen kategorileri dinle
    this.filtrelemeServis.secilenKategoriler$
      .pipe(takeUntil(this.destroy$))
      .subscribe((kategoriler) => {
        this.secilenKategoriler = kategoriler;
      });
  }

  kategoriSecildi(kategori: string[] | string) {
    if (Array.isArray(kategori)) {
      // Bu p-multiSelect'ten gelmiş
      if (kategori.length === 0) {
        this.secilenKategoriler = [...this.kategoriler]; // Hepsini seç
      } else {
        this.secilenKategoriler = kategori;
      }
    } else {
      // Bu aside tıklamasından gelmiş
      const index = this.secilenKategoriler.indexOf(kategori);
      if (index > -1) {
        this.secilenKategoriler.splice(index, 1);
      } else {
        this.secilenKategoriler.push(kategori);
      }
    }

    // Ortak filtre güncellemesi
    this.filtrelemeServis.setSecilenKategori([...this.secilenKategoriler]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
