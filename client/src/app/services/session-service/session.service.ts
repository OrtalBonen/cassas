import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { city } from 'src/app/models/city.model';
import { Register } from 'src/app/models/register.model';

import { User } from 'src/app/models/user.model';
import { baseUrl } from 'src/globalVariables';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  isUserChecked = false
  user: User

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) { }

  async getUser() {
    const url = baseUrl + '/session'
    const user = await firstValueFrom(this.http.get<User>(url))

    if (user.firstName) {
      this.user = user
      this.cartService.getCart()
    }

    this.isUserChecked = true
  }

  isEmailExists(email: string) {
    const url = baseUrl + '/session/confirmEmail/' + email
    return this.http.get<{ emailExist: boolean }>(url)
  }


  isIsraeliIdExists(israeliId: string) {
    const url = baseUrl + '/session/confirmIsraeliId/' + israeliId
    return this.http.get<{ israeliIdExist: boolean }>(url)
  }

  async register(registerObj: Register) {
    const url = baseUrl + '/session/register'
    this.user = await firstValueFrom(this.http.post<User>(url, registerObj))
  }

  async login(email: string, password: string) {
    const url = baseUrl + '/session/login'
    const user = await firstValueFrom(this.http.post<User>(url, { email, password }))
    return user

  }

  async logOut() {
    const url = baseUrl + '/session/logout'
    const result = await firstValueFrom(this.http.delete<any>(url))
    console.log(result)
    this.user = undefined
    this.cartService.deleteCart()
    return

  }

  getCities() {
    const url = baseUrl + '/cities'
    return firstValueFrom(this.http.get<city[]>(url))
  }

  //order

  placeOrder(creditCardNumber, cityId: number, street: string, streetNumber: string, delieveryDate: Date) {
    const url = baseUrl + '/order'
    return firstValueFrom(this.http.post<any>(url, { creditCardNumber, cityId, street, streetNumber, delieveryDate }))
  }

  confirmDeliveryDate(date: Date) {
    const url = baseUrl + '/order/confirm-date'
    return this.http.get<{ isDateValid: boolean }>(url, { params: { date: date.toLocaleDateString() } })
  }
}
