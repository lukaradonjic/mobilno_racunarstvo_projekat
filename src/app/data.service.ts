import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Category Interface
export interface ICategory {
  id: number,
  name: string,
  image: string,
}

// Product Interface
export interface IProduct {
  id: number,
  name: string,
  price: number,
  image: string,
  description: string
}

export interface ICart {
  id: number,
  productId: number,
  name: string,
  price: number,
  image: string,
  quantity: number,
  totalPrice: number
}

export interface IOrder {
  cart: ICart,
  time: Date,
  userId: string,
  userName: string,
  userAddress: string,
  status: number 
}

export interface IFirebaseOrder {
  key: string,
  order: IOrder
}

export interface IProfile {
  userId: string,
  name: string,
  role: string,
  address: string
}

export interface IFirebaseProfile {
  key: string,
  profile: IProfile
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private apiKey: string = environment.firebase.apiKey;
  private projectId: string = environment.firebase.projectId;
  private firestoreUrl = 'https://prodavnicadrustvenihigara-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<IProduct[]>(`${this.firestoreUrl}/products.json`);
  }

  getUsers(): Observable<any> {
    return this.http.get<IProfile[]>(`${this.firestoreUrl}/users.json`);
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(`${this.firestoreUrl}/orders.json`);
  }

  createOrder(order:any): Observable<any> {
    return this.http.post(`${this.firestoreUrl}/orders.json`, order);
  }

  updateOrderStatus(id:any, status:any): Observable<any> {
    return this.http.patch(`${this.firestoreUrl}/orders/${id}.json`, {
      "status": status
    });
  }

  updateProfile(id:any, name:any, address:any): Observable<any> {
    return this.http.patch(`${this.firestoreUrl}/users/${id}.json`, {
      "name": name,
      "address": address 
    });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, {
      email,
      password,
      returnSecureToken: true
    });
  }

  saveUserData(userId: string, name: string): Observable<any> {
    return this.http.post(`${this.firestoreUrl}/users.json`, {
      address: '',
      role: 'USER',
      name: name,
      userId
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, {
      email,
      password,
      returnSecureToken: true
    });
  }

  logout() {
    localStorage.clear();
  }

  saveToken(token: string) {
    localStorage.setItem('userToken', token);
  }

  saveRole(role: any) {
    localStorage.setItem('role', role);
  }
  
  getRole() {
    return localStorage.getItem('role');
  }

  saveUserID(id: any) {
    localStorage.setItem('userId', id);
  }
  
  getUserID() {
    return localStorage.getItem('userId');
  }

  getToken() {
    return localStorage.getItem('userToken');
  }

  getCart() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : [];
  }

  updateCart(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }


  addToCart(product: IProduct) {
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : [];
    const inCart = cart.find((x:any)=> x.productId === product.id);
    if (inCart) {
      return false;
    } else {
      cart.push({
        id: (new Date()).getTime(),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        totalPrice: product.price
      });
      this.updateCart(cart);
      return true;
    }
  }
}
