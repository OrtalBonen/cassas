import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { DepartmentComponent } from './components/department/department.component';
import { HomeComponent } from './components/home/home.component';
import { NewCollectionComponent } from './components/new-collection/new-collection.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { AdminGuard } from './guards/admin.guard';
import { LoggedUserGuard } from './guards/logged-user.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-product', component: AddProductComponent, canActivate: [AdminGuard] },
  { path: 'order', component: OrderPageComponent, canActivate: [LoggedUserGuard] },
  { path: 'shopping-cart', component: CartPageComponent },
  { path: 'department/:departmentId', redirectTo: 'department/:departmentId/', pathMatch: "full" },
  { path: 'department/:departmentId/:categoryId', component: DepartmentComponent },
  { path: 'search', component: SearchResultComponent },
  { path: 'new-collection', component: NewCollectionComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
