import { Component, OnInit } from '@angular/core';
import { DataService, IFirebaseOrder, IFirebaseProfile } from '../data.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  orders: IFirebaseOrder[] = [];

  constructor(
    private data: DataService,
  ) { }

  ngOnInit() {
    this.data.getOrders().subscribe(response => {
      Object.keys(response).forEach(key => {
        const firebaseOrder : IFirebaseOrder = {
          order: response[key],
          key: key
        }
        if (firebaseOrder.order.userId === this.data.getUserID()) {
          this.orders.push(firebaseOrder)
        }
      });
      console.log(this.orders)
    },
    error => {
      console.error('Error ')
    });

  }

}
