import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NewCollectionComponent } from './components/new-collection/new-collection.component';
import { CategoryComponent } from './components/category/category.component';
import { DepartmentComponent } from './components/department/department.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './models/CustomReuseStrategy';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { SessionComponent } from './components/session/session.component';
import { MatSelectModule } from '@angular/material/select';
import { CredentialsInterceptor } from './services/credentials.interceptor';
import { CartSideComponent } from './components/cart-side/cart-side.component';
import { MarkSearchResultPipe } from './pipes/mark-search-result.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { SearchDialogComponent } from './components/search-dialog/search-dialog.component';
import { OrderCompleteComponent } from './components/order-complete/order-complete.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ProductsListComponent,
    ProductPageComponent,
    OrderPageComponent,
    CartPageComponent,
    HomeComponent,
    NavBarComponent,
    NewCollectionComponent,
    CategoryComponent,
    DepartmentComponent,
    SearchResultComponent,
    PageNotFoundComponent,
    ProductCardComponent,
    RegisterComponent,
    LoginComponent,
    SessionComponent,
    CartSideComponent,
    MarkSearchResultPipe,
    AddProductComponent,
    MessageDialogComponent,
    AddToCartComponent,
    SearchDialogComponent,
    OrderCompleteComponent

  ],
  entryComponents: [
    SessionComponent,
    MessageDialogComponent,
    AddToCartComponent,
    SearchDialogComponent,
    ProductPageComponent,
    OrderCompleteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatRadioModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,


  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    // { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
