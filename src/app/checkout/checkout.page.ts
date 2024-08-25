import { Component, OnInit } from '@angular/core';
import { DataService, IOrder, IProfile } from '../data.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  delivery = 200;
  totalPrice = 0;
  address = ''
  userName = ''
  cart: any[] = []

  constructor(private data : DataService, private router:  Router) { }

  ngOnInit() {
    this.cart = this.data.getCart()
    this.cart.forEach(x => this.totalPrice = this.totalPrice + x.totalPrice);

    this.data.getUsers().subscribe(resUsers => {
      const users: IProfile[] = []
      Object.keys(resUsers).forEach(key => {
        const firebaseOrder : IProfile = resUsers[key];
        users.push(firebaseOrder);
      });

      console.log(users)
      const user = users.find(x => x.userId === this.data.getUserID());

      if (!user) {
        alert('Nije moguce procesuirati porudzbinu')
        return;
      }

      this.address = user.address;
      this.userName = user.name;
    });

  }

  async checkout() {
    const callArray:any[] = [];

      this.cart.forEach(x => {
        const order: IOrder = {
          cart: x,
          status: 1,
          time: new Date(),
          userAddress: this.address,
          userId: this.data.getUserID()!,
          userName: this.userName
        }

        callArray.push(this.data.createOrder(order));
        forkJoin(callArray)
        .subscribe(results => {
          this.data.updateCart([]);
          this.router.navigate(['/confirm'])
        }, error => {
          alert('Error')
        })
  
      })

    
  }
}
