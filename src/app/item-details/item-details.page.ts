import { Component, OnInit } from '@angular/core';
import { DataService, IProduct } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  productId: number = 0;

  product: IProduct = {
    id :0,
    image: '',
    name: '',
    price: 0,
    description: ''
  };

  constructor(
    private data: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id')!;
    });

    this.data.getProducts().subscribe((response:any) => {
      this.product = response.find((x:any) => x.id === this.productId);
      if (!this.product) {
        alert('Proizvod nije pronađen')  
      }
    },
    error => {
      alert('Proizvod nije pronađen')
    });

  }

  addToCart() {
    const success = this.data.addToCart(this.product);
    if (!success) {
      alert('Proizvod je već u korpi.')
    } else {
      alert('Dodato u korpu')
    }

  }
}
