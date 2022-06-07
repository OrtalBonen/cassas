import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Department } from 'src/app/models/department.model';
import { validatorMessages } from 'src/app/models/validator-massages';
import { AdminService } from 'src/app/services/admin-sevice/admin.service';
import { ProductsService } from 'src/app/services/products-service/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  colors = []
  product
  departments: Department[] = []
  categories: Category[] = []

  validatorMessages = validatorMessages

  public form: FormGroup
  public get name() { return this.form.get('name') }
  public get previewImgUrl() { return this.form.get('previewImgUrl') }
  public get price() { return this.form.get('price') }
  public get quantity() { return this.form.get('quantity') }
  public get colorId() { return this.form.get('colorId') }
  public get departmentId() { return this.form.get('departmentId') }
  public get categoryId() { return this.form.get('categoryId') }

  constructor(
    public adminService: AdminService,
    private productsService: ProductsService,
    private acr: ActivatedRoute,
    private router: Router,
    private location: Location,
    fb: FormBuilder,
  ) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      previewImgUrl: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.pattern('[1-9][0-9]*')]],
      colorId: [null, [Validators.required]],
      departmentId: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    })

    this.departmentId.valueChanges.subscribe(selectedDepartmentId => {
      const department = this.departments.find(d => d.id === selectedDepartmentId)

      if (department) {
        this.categories = department.categories
      }
    })
  }

  ngOnInit(): void {
    this.init()
  }
  init() {
    this.getColors()
    this.getDepartments()
  }

  async getDepartments() {
    try {
      this.departments = await this.productsService.getDepartments()

    } catch (error) {
      console.log(error)
    }
  }

  async getColors() {
    this.colors = await this.adminService.getColors()
  }

  async addProduct() {
    if (!this.form.valid) return

    await this.adminService.addProduct(this.name.value,
      this.price.value, this.previewImgUrl.value, this.quantity.value, this.colorId.value, this.categoryId.value)
    this.form.reset()
  }

  resetForm() {
    this.form.reset()
  }

  backClicked() {
    this.location.back();
  }
}
