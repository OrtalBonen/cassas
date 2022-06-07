import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/citiy.model';
// import { Colors } from 'src/app/models/color.model';
import { Department } from 'src/app/models/department.model';
import { CitiesService } from 'src/app/services/cities.service';
import { DataService } from 'src/app/services/data.service';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { SessionService } from 'src/app/services/session-service/session.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { SessionComponent } from '../session/session.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';

@Component({

  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private data: DataService,
    public dialog: MatDialog,
    public sessionService: SessionService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  openLogInDialog() {
    this.dialog.open(SessionComponent)
  }

  logOut() {
    this.sessionService.logOut()
  }

  changeCartStatus() {
    this.cartService.toggleCart()
  }

  async getCart() {
    await this.cartService.getCart()
  }

  openSearchDialog() {
    this.dialog.open(SearchDialogComponent)
  }
}
