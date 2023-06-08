import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Shopping Cart',
  },
  {
    path: 'order-sent',
    component: ThankyouComponent,
    title: 'Thank you',
  },
];

export default routeConfig;

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
