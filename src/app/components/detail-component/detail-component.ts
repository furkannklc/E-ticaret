import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Productservices} from '../../services/productservices'; // Adjust the import path as necessary
import {Product} from '../../models/product.model';
import {RadioButton} from 'primeng/radiobutton';
import {FormsModule} from '@angular/forms';
import {Rating} from 'primeng/rating'; // Adjust the import path as necessary
@Component({
  selector: 'app-detail-component',
  imports: [
    RadioButton,
    FormsModule,
    Rating
  ],
  templateUrl: './detail-component.html',
  styleUrl: './detail-component.css'
})
export class DetailComponent implements OnInit {
  urunId!: number ;
  urun!:Product;
  constructor(private route: ActivatedRoute,private urunServis:Productservices) { }

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

}

