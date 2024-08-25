import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {

  cart: any[] = []

  constructor(private data : DataService) { }

  ngOnInit() {
    this.cart = this.data.getCart()
  }

  add(productId: number) {
    const item = this.cart.find(x => x.productId === productId);
    if (item) {
      item.quantity = item.quantity + 1;
      item.totalPrice = item.quantity * item.price;
    }

    this.data.updateCart(this.cart);
  }

  subtract(productId: number) {
    const item = this.cart.find(x => x.productId === productId);
    if (item) {
      if (item.quantity === 1) {
        if (confirm('Da li želite da izbacite proizvod iz korpe?')) {
          this.cart = this.cart.filter(x => x.productId !== productId);
          this.data.updateCart(this.cart);
        }
      } else {
        item.quantity = item.quantity - 1;
        item.totalPrice = item.quantity * item.price;
        this.data.updateCart(this.cart);
      }
      
    }
  }

}
