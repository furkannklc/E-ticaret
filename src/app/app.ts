import { Component, signal } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Button} from 'primeng/button';
import { Productservices } from './services/productservices';
import {ProductCardComponent} from './components/product-card-component/product-card-component';
import {FilterComponent} from './components/filter-component/filter-component';
import {NavbarComponent} from './components/navbar-component/navbar-component';
import {FooterComponent} from './components/footer-component/footer-component';
import {Siralaservices} from './services/siralaservices';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, ProductCardComponent, FilterComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  showSortButton = false;
  showFilter=true;
  constructor(private router: Router,private siralaService: Siralaservices) {
    // Router değişikliklerini dinle
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Sadece belirli route'larda göster
      this.showSortButton = this.shouldShowSortButton(event.url);
      this.showFilter=this.shouldShowFilter(event.url);
    });
  }

  private shouldShowSortButton(url: string): boolean {
    // Sadece ana sayfa için göster
    return url === '/' || url === '';
  }
  private shouldShowFilter(url: string): boolean {
    // Sadece ana sayfa için göster
    return url === '/' || url === '';
  }

  siralaButonunaTiklandi() {
    this.siralaService.siralamaTetikle();
  }
}
