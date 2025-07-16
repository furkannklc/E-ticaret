import {Component, OnInit} from '@angular/core';
import {Tag} from 'primeng/tag';
import {Product} from '../../models/product.model';
import {Productservices} from '../../services/productservices';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Button, ButtonDirective} from 'primeng/button';
import {DataView} from 'primeng/dataview';
import {Select} from 'primeng/select';
import {Toolbar} from 'primeng/toolbar';
import {Badge} from 'primeng/badge';
import {Card} from 'primeng/card';
import {Rating} from 'primeng/rating';
import {InputText} from 'primeng/inputtext';
import {Menubar} from 'primeng/menubar';

import { Router } from '@angular/router';
// Adjust the import path as necessary
@Component({
  selector: 'app-product-card-component',
  standalone: true,
  imports: [
    Tag,
    FormsModule,
    NgClass,
    ButtonDirective,
    DataView,
    Select,
    Button,
    Toolbar,
    Badge,
    Card,
    Rating,
    InputText,


  ],
  templateUrl: './product-card-component.html',
  styleUrl: './product-card-component.css'
})
export class ProductCardComponent implements OnInit {

  productListesi: Product[] = [];
  goToProductDetail(id:number){
    this.router.navigate(['/productDetail', id]);

  }
  constructor(private productservices :Productservices ,private router: Router) {}


    urunleriGetir(){
    this.productservices.urunlerGetir().subscribe((data: Product[]) => {
      this.productListesi = data;
      console.log(this.productListesi);
    }
    )
  }

    ngOnInit(): void {
        this.urunleriGetir()
    }


  protected readonly getComputedStyle = getComputedStyle;
}
