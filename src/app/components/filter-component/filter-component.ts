import { Component } from '@angular/core';
import {Checkbox} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-filter-component',
  imports: [
    Checkbox,
    FormsModule
  ],
  templateUrl: './filter-component.html',
  styleUrl: './filter-component.css'
})
export class FilterComponent {
kategori!: string ;
}
