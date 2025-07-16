import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-component',
  imports: [],
  templateUrl: './detail-component.html',
  styleUrl: './detail-component.css'
})
export class DetailComponent implements OnInit {
  urunId!: number ;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.urunId = +idParam;
        console.log("Ürün ID:", this.urunId);
      }
    })
    }

}
