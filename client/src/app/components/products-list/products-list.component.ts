import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Department } from 'src/app/models/department.model';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { filter } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  //pagination

  navSubscription: Subscription = null
  rowCount = 4
  maxPages: number | undefined
  offset = 0
  currentPage = 1
  pagesArray: number[] = []

  @Output() pageSelected = new EventEmitter<{ offset: number, rowCount: number }>()

  handleClick(selectedPage: number) {

    this.currentPage = selectedPage

    this.offset = (this.currentPage - 1) * this.rowCount

    this.pageSelected.emit({ offset: this.offset, rowCount: this.rowCount })
  }

  @Input('products') products: Product[]
  @Input('productCount') productCount: number
  constructor(
    private productsService: ProductsService,
    private acr: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.navSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.currentPage = 1
      this.getMaxPages()
    })
    this.init()
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }

  async init() {
    this.getMaxPages()
  }

  getMaxPages() {
    this.maxPages = Math.ceil(this.productCount / this.rowCount)
    this.pagesArray = []
    for (let i = 1; i < this.maxPages + 1; i++) {
      this.pagesArray.push(i)
    }
  }

  productChanged() {
    this.pageSelected.emit({ offset: this.offset, rowCount: this.rowCount })
  }
}
