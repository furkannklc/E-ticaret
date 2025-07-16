import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Button} from 'primeng/button';
import { Productservices } from './services/productservices';
import {ProductCardComponent} from './components/product-card-component/product-card-component';
import {FilterComponent} from './components/filter-component/filter-component';
import {NavbarComponent} from './components/navbar-component/navbar-component'; // Adjust the import path as necessary
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, ProductCardComponent, FilterComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    constructor(private productservices: Productservices ) {
    }


}
