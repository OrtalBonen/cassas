import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Department } from 'src/app/models/department.model';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { Product } from 'src/app/models/product.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit, OnDestroy {
  productCount: number
  products: Product[] = []
  departments: Department[] = []
  selectedDepartment: Department | undefined
  selectedCategory: Category | undefined

  //navigation
  navSubscription: Subscription = null

  constructor(
    private acr: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.navSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.productCount = undefined
      this.products = []
      this.init()
    })
    this.init()
  }

  ngOnDestroy(): void {
    this.navSubscription.unsubscribe()
  }

  async init() {
    const { departmentId, categoryId } = this.getParamsIfValid()

    if (!departmentId) return

    if (!this.departments.length) {
      await this.getDepartments()
    }
    this.findSelectedDepartment(departmentId)

    if (!this.selectedDepartment) return

    if (categoryId) {
      this.findSelectedCategory(categoryId)

      if (!this.selectedCategory) return
    }
    this.getProductCount()
    this.getProducts(0, 4)
  }

  getParamsIfValid() {
    //department id validation
    const departmentIdString = this.acr.snapshot.params['departmentId']
    const departmentId = this.returnIfIntegerBiggerThenZero(departmentIdString)
    if (!departmentId) {
      // this.router.navigateByUrl('/page-not-found')
      return {}
    }
    // category id validation
    const categoryIdString = this.getCategoryParamIfExist()
    if (!categoryIdString) {
      this.selectedCategory = undefined
      return { departmentId }
    }
    const categoryId = this.returnIfIntegerBiggerThenZero(categoryIdString)
    if (!categoryId) return {}
    return { departmentId, categoryId }
  }

  async getDepartments() {
    try {
      this.departments = await this.productsService.getDepartments()

    } catch (error) {
      console.log(error)
    }
  }

  findSelectedCategory(categoryId: number) {
    const selectedCategory = this.selectedDepartment.categories.find(c => c.id === categoryId)
    if (!selectedCategory) return
    this.selectedCategory = selectedCategory
  }

  findSelectedDepartment(departmentId: number) {
    if (Array.isArray(this.departments)) {

      const selectedDepartment = this.departments.find(d => d.id === departmentId)
      if (selectedDepartment) {
        this.selectedDepartment = selectedDepartment
      }
    }

  }

  returnIfIntegerBiggerThenZero(value: any) {
    // const value = this.acr.snapshot.params['departmentId'];
    if (isNaN(value)) return undefined
    const number = Number(value)
    if (!Number.isInteger(number) || number <= 0) return undefined
    return number
  }

  async getProductCount() {

    if (this.selectedCategory) {
      const { count } = await this.productsService.getProductCount(null, null, this.selectedCategory?.id, null)
      this.productCount = count
    }
    else {
      const { count } = await this.productsService.getProductCount(null, this.selectedDepartment?.id, null, null)
      this.productCount = count
    }
  }

  async getProducts(offset: number, rowCount: number) {
    if (!this.selectedCategory) {
      this.products = await this.productsService.getProductsByDepartment(this.selectedDepartment.id, offset, rowCount)
      console.log(this.products)
    }
    if (this.selectedCategory) {
      this.products = await this.productsService.getProductsByCategory(this.selectedCategory.id, offset, rowCount)
    }
  }

  handlePageSelected(e) {
    this.getProducts(e.offset, e.rowCount)
  }
  departmenParamValidation() {
    const departmentIdString = this.acr.snapshot.params['departmentId']
    const departmentId = this.returnIfIntegerBiggerThenZero(departmentIdString)
    if (!departmentId) {
      this.router.navigateByUrl('/page-not-found')
    }
    return departmentId
  }

  getSelectedCategoryyy() {
    const categoryIdString = this.getCategoryParamIfExist()
    if (!categoryIdString) return null
    const categoryId = this.returnIfIntegerBiggerThenZero(categoryIdString)
    if (!categoryId) return
    const selectedCategory = this.selectedDepartment?.categories.find(c => c.id === categoryId)
    if (!selectedCategory) return
    this.selectedCategory = selectedCategory
  }

  getCategoryParamIfExist() {
    const categoryIdString = this.acr.snapshot.params['categoryId']
    if (!categoryIdString) return undefined
    return categoryIdString
  }

  departmentIdParamValidation() {
    const departmentIdString = this.acr.snapshot.params['departmentId']
    const departmentId = this.returnIfIntegerBiggerThenZero(departmentIdString)
    if (!departmentId) {
      return undefined
    }
    return departmentId
  }

  getSelectedDepartmentt() {
    const departmentId = this.departmentIdParamValidation()
    if (!departmentId) this.router.navigateByUrl('/page-not-found')

  }

}
