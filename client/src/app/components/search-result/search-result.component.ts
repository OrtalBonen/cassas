import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products-service/products.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  searchWord: string
  productCount: number
  products = []
  paramsSubscription: Subscription = null

  constructor(
    private acr: ActivatedRoute,
    private productsService: ProductsService

  ) {
    this.paramsSubscription = this.acr.queryParams.subscribe(params => {
      this.searchWord = params['q'];

      if (this.searchWord) {
        this.getProductCount()
        this.getProducts(0, 4)
      }
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe()
  }

  async getProducts(offset: number, rowCount: number) {
    this.products = await this.productsService.getProductsByUserSearch(this.searchWord, offset, rowCount)
  }

  async getProductCount() {
    const { count } = await this.productsService.getProductCount(this.searchWord, undefined, undefined, undefined)
    this.productCount = count
  }

  handlePageSelected(e) {
    this.getProducts(e.offset, e.rowCount)
  }
}
