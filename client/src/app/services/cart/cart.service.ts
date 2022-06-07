import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProductOption } from 'src/app/models/product.model';
import { baseUrl } from 'src/globalVariables';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: any
  cartTotalPrice = 0
  isCartOpen = false
  selectedProductOption: ProductOption
  completedOrderId: number

  constructor(
    private http: HttpClient
  ) { }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen

    if (this.isCartOpen) {
      this.getCart()
    }
  }

  closeCart() {
    this.isCartOpen = false
  }

  async getCart() {
    const url = baseUrl + '/cart/getCart'
    const { cart } = await firstValueFrom(this.http.get<any>(url))
    this.cart = cart
    this.updateCartTotalPrice()
  }

  private updateCartTotalPrice() {
    if (this.cart) {
      this.cartTotalPrice = this.cart.cartItems.reduce((total, item) => {
        return total + item.totalPrice
      }, 0)
    }
    else {
      this.cartTotalPrice = 0
    }
  }

  async emptyCart() {
    const url = baseUrl + '/cart/emptyCart'
    await firstValueFrom(this.http.delete<any>(url))
    await this.getCart()
  }

  async deleteCartItem(itemId: number) {
    const url = baseUrl + '/cart/item/' + itemId
    await firstValueFrom(this.http.delete<any>(url))
    await this.getCart()
  }

  async addProductToCart(productId: number, quantity: number) {
    const url = baseUrl + '/cart/addproduct/' + productId + '/' + quantity
    await firstValueFrom(this.http.get<any>(url))
    await this.getCart()
  }

  deleteCart() {
    this.cart = undefined
    this.cartTotalPrice = 0
  }
}
