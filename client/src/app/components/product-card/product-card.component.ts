import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product, ProductOption } from 'src/app/models/product.model';
import { AdminService } from 'src/app/services/admin-sevice/admin.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { SessionService } from 'src/app/services/session-service/session.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { ProductPageComponent } from '../product-page/product-page.component';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product
  selectedProductOption: ProductOption

  @Output('productChanged') productChanged = new EventEmitter<void>()

  constructor(
    public sessionService: SessionService,
    private cartService: CartService,
    private adminService: AdminService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.init()
  }

  init() {
    if (this.product?.productOptions?.length) {
      this.selectedProductOption = this.product?.productOptions[0]
    }
  }

  addToCart() {
    this.cartService.selectedProductOption = this.selectedProductOption
    this.dialog.open(AddToCartComponent)
  }

  openLogInDialog() {
    this.dialog.open(MessageDialogComponent)
  }

  edit() {
    this.adminService.selectedProduct = this.product
    this.adminService.selectedProductOption = this.selectedProductOption

    this.dialog.open(ProductPageComponent)
      .afterClosed().subscribe(() => {
        this.productChanged.emit()
      })
  }
}
