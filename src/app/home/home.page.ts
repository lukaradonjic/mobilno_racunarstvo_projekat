import { Component, OnInit } from '@angular/core';
import { DataService, IProduct } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public products : IProduct[] = [];
  search = ''

  constructor(
    private data: DataService,
  ) { }

  ngOnInit() {
    this.data.getProducts().subscribe(response => {
      console.log('Sign up successful', response);
      this.products = response;
    },
    error => {
      console.error('Error signing')
    });

  }

  onSearchChange() {
    this.data.getProducts().subscribe( (response: IProduct[]) => {
      this.products = response.filter( x => x.name.includes(this.search));
    },error => {
      console.error('Error signing')
    });
  }
}
