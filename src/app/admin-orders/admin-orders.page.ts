import { Component, OnInit } from '@angular/core';
import { DataService, IFirebaseOrder } from '../data.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.page.html',
  styleUrls: ['./admin-orders.page.scss'],
})
export class AdminOrdersPage implements OnInit {

  orders : IFirebaseOrder[] = [];

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
        this.orders.push(firebaseOrder)
      });
      console.log(this.orders)
    },
    error => {
      console.error('Error ')
    });

  }

  confirm(id: any) {
    this.data.updateOrderStatus(id, 2).subscribe(response => {
      this.orders.forEach( (x:any) => {
        if (x.key === id) {
          x.order.status = 2;
        }
      })
    },
    error => {
      console.error('Error ')
    });
  }

  reject(id: any) {
    this.data.updateOrderStatus(id, 3).subscribe(response => {
      this.orders.forEach( (x:any) => {
        if (x.key === id) {
          x.order.status = 3;
        }
      })
    },
    error => {
      console.error('Error ')
    });
  }

}
