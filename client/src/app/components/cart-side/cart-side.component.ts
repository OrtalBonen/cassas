import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { SessionService } from 'src/app/services/session-service/session.service';
import { SessionComponent } from '../session/session.component';

@Component({
  selector: 'app-cart-side',
  templateUrl: './cart-side.component.html',
  styleUrls: ['./cart-side.component.scss']
})
export class CartSideComponent implements OnInit {

  totalCart: number

  constructor(
    public sessionService: SessionService,
    public cartService: CartService,
    public dialog: MatDialog,
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.init()
  }

  openLogInDialog() {
    this.cartService.closeCart()
    this.dialog.open(SessionComponent)
  }

  init() {
    if (this.sessionService.user) {
      this.cartService.getCart()
    }
  }

  closeCart() {
    this.cartService.closeCart()
  }

  checkout() {
    this.cartService.closeCart()
    this.router.navigateByUrl('/order')
  }

  async emptyCart() {
    await this.cartService.emptyCart()
  }

  async deleteCartItem(itemId: number) {
    await this.cartService.deleteCartItem(itemId)
  }
}
