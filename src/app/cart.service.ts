import { Injectable } from '@angular/core';
import { Product } from './product';
import { CartComponent } from './cart/cart.component';
import { Observable, Subject, ObservableLike, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  shoppingCart: Product[] = [];
  totalPrice: number = 0;
  cartCount: Subject<number> = new Subject<number>();

  constructor() {}

  setData(data: Product) {
    if (!this.shoppingCart.some((product) => product.id === data.id)) {
      this.shoppingCart.push(data);
      this.totalPrice = this.shoppingCart.reduce(
        (sum, product) => sum + product.price,
        0
      );
    } else {
      alert('product already added');
    }
    this.cartCount.next(this.shoppingCart.length);
  }

  getData(): Product[] {
    return this.shoppingCart;
  }

  getCartCount(): Observable<number> {
    return this.cartCount.asObservable();
  }

  setCartCount(c: number) {
    this.cartCount.next(c);
  }

  resetCart() {
    this.shoppingCart = [];
  }
}
