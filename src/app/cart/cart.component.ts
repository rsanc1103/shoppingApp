import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ProductDetailsComponent, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: Product[] = [];
  cartItemsCount = 0;
  totalPrice = 0;
  order = {
    shipping: {},
    items: {},
  };
  states = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  addItem(product: Product) {
    this.cartItems.push(product);
  }

  addQty(product: Product) {
    this.cartItems.forEach((p) => {
      if (p.id === product.id) {
        p.qty! += 1;
      }
    });

    this.calculateTotalPrice();
  }
  remvoeQty(product: Product) {
    this.cartItems.forEach((p) => {
      if (p.id === product.id) {
        if (p.qty == 1) {
          this.removeItem(p);
        }
        p.qty! -= 1;
      }
    });

    this.calculateTotalPrice();
  }

  removeItem(product: Product) {
    this.cartItems.forEach((p, i) => {
      if (p.id === product.id) {
        this.cartItems.splice(i, 1)[0];
      }
    });
    this.calculateTotalPrice();
  }

  getTotalItemsCount() {
    let count = 0;
    this.cartItems.forEach((p) => {
      count += p.qty!;
    });
    return count;
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (sum, product) => sum + product.price * product.qty!,
      0
    );
    this.cartService.setCartCount(this.getTotalItemsCount());
  }

  constructor(private cartService: CartService, private router: Router) {
    this.cartItems = this.cartService.getData();
    this.cartItemsCount = this.cartItems.length;
    this.totalPrice = this.cartService.totalPrice;

    this.cartItems.forEach((p) => {
      p.qty! = 1;
    });
  }
  orderDetails = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{5}$/),
    ]),
  });

  submitOrder() {
    this.order.shipping = this.orderDetails.value;

    this.order.items = this.cartItems;
    console.log(this.order);

    this.cartItems = [];
    this.cartService.setCartCount(this.getTotalItemsCount());
    this.cartService.resetCart();

    this.router.navigate(['/order-sent']);
  }
}
