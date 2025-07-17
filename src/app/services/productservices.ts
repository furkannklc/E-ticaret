import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class Productservices {

  private apiUrl = 'https://fakestoreapi.com';
  constructor(private http: HttpClient) {
  }
  urunlerGetir(){
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
  urunGetir(id: number){
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }
  kategorileriGetir() {
    return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
  }
}
