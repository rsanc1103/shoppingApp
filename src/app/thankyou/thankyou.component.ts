import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css'],
})
export class ThankyouComponent {
  customerName = ''
  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }
}
