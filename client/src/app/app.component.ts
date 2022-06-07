import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { firstValueFrom, retry } from 'rxjs';
import { baseUrl } from 'src/globalVariables';
import { Department } from './models/department.model';
import { CartService } from './services/cart/cart.service';
import { ProductsService } from './services/products-service/products.service';
import { SessionService } from './services/session-service/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  @ViewChild('cart') cart: ElementRef
  @ViewChild('cartBtn') cartBtn: ElementRef
  constructor(
    public sessionService: SessionService,
    private cartService: CartService,
    private productsService: ProductsService,
    public acr: ActivatedRoute,
    private http: HttpClient,
    private renderer: Renderer2
  ) {

  }

  toggleCart() {
    this.cartService.toggleCart();
  }

  ngOnInit() {
    this.getUser()
  }

  async getUser() {
    await this.sessionService.getUser()
  }
}





