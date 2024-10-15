import { Component } from '@angular/core';
import { OrderDto } from '../model/OrderDto';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
  orderSummary?: OrderDto;
  obj: any;
  total?: any;
  showDialog: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    const data = this.route.snapshot.queryParams['data'];
    if (data) {
      this.obj = JSON.parse(data); // Parse the stringified data
      console.log('Parsed order summary:', this.obj); // Log the parsed data

      this.obj.userId = 1; // Set user ID
      this.orderSummary = this.obj;

      // Calculate the total price of all items in the cart
      this.total = (this.orderSummary?.foodItemsList ?? []).reduce(
        (accumulator, currentValue) => {
          return (
            accumulator + currentValue.quantity * (currentValue.price ?? 0)
          );
        },
        0
      );
    } else {
      console.error('No data found in queryParams'); // Log if no data found
    }
  }

  saveOrder() {
    this.orderService.saveOrder(this.orderSummary).subscribe(
      (response) => {
        this.showDialog = true;
        console.log(response);
      },
      (error) => {
        console.error('Failed to save data:', error);
      }
    );
  }

  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/']); // Replace '/home' with the actual route for your home page
  }
}
