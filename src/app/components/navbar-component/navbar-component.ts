import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar-component',
  imports: [
    FormsModule
  ],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})
export class NavbarComponent {
  constructor(private router : Router) {
  }
aranacak!: string;
sepeteGit(){
  this.router.navigate(['/sepet']);
}
}
