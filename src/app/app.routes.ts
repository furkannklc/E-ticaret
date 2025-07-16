import { Routes } from '@angular/router';
import {DetailComponent} from './components/detail-component/detail-component';
import {ProductCardComponent} from './components/product-card-component/product-card-component';

export const routes: Routes = [
  { path: '', component: ProductCardComponent },
  { path: 'productDetail/:id', component: DetailComponent }
];
