import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Color } from 'src/app/models/color.model';
import { Product, ProductOption } from 'src/app/models/product.model';
import { baseUrl } from 'src/globalVariables';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  selectedProduct: Product
  selectedProductOption: ProductOption

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = baseUrl

  getColors() {
    const url = baseUrl + '/products/colors'
    return firstValueFrom(this.http.get<Color[]>(url))
  }

  getProduct(id: number) {
    const url = baseUrl + '/products/rootProduct/' + id
    return firstValueFrom(this.http.get<any>(url))
  }

  editProduct(rootProductId: number, productOptionId: number,
    name: string, price: number, previewImgUrl: string, quantity: number, colorId: number) {
    const url = baseUrl + '/admin/edit/product/' + rootProductId + '/' + productOptionId
    return firstValueFrom(this.http.put<any>(url, { rootProductId, productOptionId, name, price, previewImgUrl, quantity, colorId }))
  }

  addProduct(name: string, price: number, previewImgUrl: string, quantity: number, colorId: number, categoryId: number,) {
    const url = baseUrl + '/admin/product'
    return firstValueFrom(this.http.post<any>(url, { name, price, previewImgUrl, quantity, colorId, categoryId, }))
  }


}
