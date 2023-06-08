import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { CartButtonComponent } from './cart-button/cart-button.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterLink, CartButtonComponent],
  template: `
    <main>
      <header class="brand-name">
        <a [routerLink]="['/']"> Shopping App - Hello Ismael</a>
        <app-cart-button></app-cart-button>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'shopping';
}
