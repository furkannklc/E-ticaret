import { Routes } from '@angular/router';
import {DetailComponent} from './components/detail-component/detail-component';
import {ProductCardComponent} from './components/product-card-component/product-card-component';
import {SepetComponent} from './components/sepet-component/sepet-component';
export const routes: Routes = [
  { path: '', component: ProductCardComponent },
  { path: 'productDetail/:id', component: DetailComponent },
  { path: 'sepet', component: SepetComponent }
];
