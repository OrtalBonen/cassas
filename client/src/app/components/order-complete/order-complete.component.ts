import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart/cart.service';
import { baseUrl } from 'src/globalVariables';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.scss']
})
export class OrderCompleteComponent implements OnInit {

  invoiceUrl = ''

  constructor(
    private cartService: CartService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.invoiceUrl = baseUrl + `/order/invoice/${this.cartService.completedOrderId}`
  }

  close() {
    this.dialog.closeAll()
  }
}
