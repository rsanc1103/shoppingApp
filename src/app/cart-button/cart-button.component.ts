import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: ` <a [routerLink]="['cart']"
    ><span *ngIf="count > 0">{{ count }}</span> Cart</a
  >`,
  styleUrls: ['./cart-button.component.css'],
})
export class CartButtonComponent {
  count = 0;
  cartCounterObservable: Subscription;

  constructor(private cartService: CartService) {
    this.cartCounterObservable = this.cartService
      .getCartCount()
      .subscribe((data: number) => {
        this.count = data;
      });
  }
}
