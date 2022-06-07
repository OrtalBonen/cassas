import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { city } from 'src/app/models/city.model';
import { SessionService } from 'src/app/services/session-service/session.service';
import { validatorMessages } from 'src/app/models/validator-massages'
import { isDeliveryDateConfirmedValidator } from 'src/app/custom-validators/delivery-date-confirmed.validator';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderCompleteComponent } from '../order-complete/order-complete.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  cities: city[] = []
  validatorMessages = validatorMessages
  searchProducrInp = ""
  today = new Date()
  public form: FormGroup
  public get cityId() { return this.form.get('cityId') }
  public get street() { return this.form.get('street') }
  public get streetNumber() { return this.form.get('streetNumber') }
  public get creditCardNumber() { return this.form.get('creditCardNumber') }
  public get deliveryDate() { return this.form.get('deliveryDate') }

  constructor(
    public sessionService: SessionService,
    public cartService: CartService,
    fb: FormBuilder,
    private location: Location,
    private dialog: MatDialog,
    private router: Router
  ) {

    this.form = fb.group({
      cityId: [null, [Validators.required]],
      street: ['', [Validators.required]],
      streetNumber: ['', [Validators.required]],
      creditCardNumber: ['', [Validators.required, Validators.pattern('(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)')]],
      deliveryDate: ['', {
        validators: [Validators.required],
        updateOn: 'blur',
        asyncValidators: [isDeliveryDateConfirmedValidator.createValidator(sessionService)],
      }
      ]

    })

  }

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.getCart()
    this.getCities()
  }

  async getCart() {
    this.cartService.getCart()
  }

  async getCities() {
    this.cities = await this.sessionService.getCities()
  }

  async placeOrder() {
    try {
      await this.sessionService.placeOrder(
        this.creditCardNumber.value,
        this.cityId.value, this.street.value, this.streetNumber.value,
        this.deliveryDate.value)

      this.cartService.completedOrderId = this.cartService.cart.id

      this.getCart()

      this.dialog.open(OrderCompleteComponent).afterClosed().subscribe(() => {
        this.router.navigateByUrl('/')
      })

    } catch (error) {
      console.log(error)
    }
  }
}
