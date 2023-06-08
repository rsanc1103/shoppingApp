import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductDetailsComponent],
  template: `
    <section>
      <form class="text-center">
        <input
          type="text"
          placeholder="Search your product"
          (input)="filterResults(filter.value)"
          #filter
        />
        <ul
          *ngIf="filteredProductsList.length != productsList.length"
          class="search-result"
        >
          <li *ngFor="let hero of filteredProductsList">
            <a>
              {{ hero.name }}
            </a>
          </li>
        </ul>
      </form>
    </section>
    <section class="results">
      <app-product-details
        *ngFor="let product of productsList"
        [product]="product"
      >
      </app-product-details>
    </section>
    <footer class="text-center">
      <p>&copy; Copyright 2023. All rights reserved SHOPPING APP</p>
    </footer>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  productsList: Product[] = [];
  filteredProductsList: Product[] = [];
  productService: ProductService = inject(ProductService);
  searching = false;

  constructor(private cartService: CartService) {
    this.productService.getAllProducts().then((productsList: Product[]) => {
      this.productsList = productsList;
      this.filteredProductsList = productsList;
    });
  }

  filterResults(text: string) {
    this.searching = true;
    if (!text) {
      this.filteredProductsList = this.productsList;
    }

    this.filteredProductsList = this.productsList.filter((product) =>
      product?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
