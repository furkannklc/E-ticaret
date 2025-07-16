import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-navbar-component',
  imports: [
    FormsModule
  ],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})
export class NavbarComponent {
aranacak!: string;
}
