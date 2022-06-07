import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products-service/products.service';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.scss']
})
export class NewCollectionComponent implements OnInit {

  productCount: number
  products: Product[] = []

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init() {
    this.getProductCount()
    this.getProducts(0, 4)
  }

  async getProducts(offset: number, rowCount: number) {
    this.products = await this.productsService.getNewProducts(offset, rowCount)
  }

  async getProductCount() {
    const { count } = await this.productsService.getProductCount(null, null, null, true)
    this.productCount = count

  }

  handlePageSelected(e) {
    this.getProducts(e.offset, e.rowCount)
  }
}
