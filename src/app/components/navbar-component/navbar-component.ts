import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Filtrelemeservices} from '../../services/filtrelemeservices';
import {Sepetservices} from '../../services/sepetservices';

@Component({
  selector: 'app-navbar-component',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})
export class NavbarComponent implements OnInit {
  miktar:number=0;
  constructor(
    private router : Router,
    private filtrelemeServis:Filtrelemeservices ,private sepetservis:Sepetservices) {}

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
