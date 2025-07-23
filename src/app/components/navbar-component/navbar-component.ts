import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Filtrelemeservices} from '../../services/filtrelemeservices';
import {Sepetservices} from '../../services/sepetservices';
import {DOCUMENT, NgClass} from '@angular/common';
import { inject } from '@angular/core';

@Component({
  selector: 'app-navbar-component',
  imports: [
    FormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})
export class NavbarComponent implements OnInit {
  miktar:number=0;
  isDark = false;
  private doc = inject(DOCUMENT);

  toggleDark() {
    document.documentElement.classList.toggle('dark');
  }


  constructor(
    private router : Router,
    private filtrelemeServis:Filtrelemeservices ,private sepetservis:Sepetservices) {
    this.isDark = this.doc.documentElement.classList.contains('app-dark');
  }

  ngOnInit(): void {
    this.sepetservis.miktar$.subscribe(count => {
      this.miktar = count;
    });
    }

aranacak!: string;

  onSearchChange() {
    this.filtrelemeServis.guncelleArama(this.aranacak);
  }
sepeteGit(){
  this.router.navigate(['/sepet']);
}
}
