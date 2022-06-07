import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products-service/products.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  quantity = 1

  constructor(
    private cartService: CartService,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
  }

  async addToCart() {
    await this.cartService.addProductToCart(this.cartService.selectedProductOption.id, this.quantity)
    this.dialog.closeAll()
  }

  lowerQuantity() {
    if (this.quantity >= 1) {
      this.quantity--
    }
  }

  raiseQuantity() {
    this.quantity++
  }

}
