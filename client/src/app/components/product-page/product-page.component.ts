import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductOption } from 'src/app/models/product.model';
import { validatorMessages } from 'src/app/models/validator-massages';
import { AdminService } from 'src/app/services/admin-sevice/admin.service';
import { SessionService } from 'src/app/services/session-service/session.service';
import { Location } from '@angular/common';
import { Color } from 'src/app/models/color.model';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart/cart.service';



@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  colors: Color[] = []
  product: Product
  productOption: ProductOption
  validatorMessages = validatorMessages

  public form: FormGroup
  public get name() { return this.form.get('name') }
  public get previewImgUrl() { return this.form.get('previewImgUrl') }
  public get price() { return this.form.get('price') }
  public get quantity() { return this.form.get('quantity') }
  public get colorId() { return this.form.get('colorId') }

  constructor(
    public adminService: AdminService,
    private dialog: MatDialog,
    private router: Router,
    private location: Location,
    fb: FormBuilder,
  ) {

    this.form = fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      previewImgUrl: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.pattern('[1-9][0-9]*')]],
      colorId: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getProduct()
  }

  async getProduct() {

    await this.getColors()

    try {
      // get the product again
      this.product = await this.adminService.getProduct(this.adminService.selectedProduct.id)

      this.getSelectedProductOption()

    } catch (error) {
      if (error.status === 404) {
        this.router.navigateByUrl('/page-not-found')
      }
    }

  }

  getSelectedProductOption() {
    const productOptionId = this.adminService.selectedProductOption.id
    if (!this.product.productOptions?.length) return this.productOption = undefined
    this.productOption = this.product?.productOptions.find(o => o.id === productOptionId)
    this.setFormValues()
  }

  async getColors() {
    this.colors = await this.adminService.getColors()
  }

  async save() {
    if (!this.form.valid) return

    try {
      await this.adminService.editProduct(this.product.id, this.productOption.id,
        this.name.value, this.price.value, this.previewImgUrl.value, this.quantity.value, this.colorId.value)

      this.dialog.closeAll()

    } catch (error) {
      console.log(error);
    }
  }

  setFormValues() {
    this.form.setValue({
      name: this.product.name,
      previewImgUrl: this.productOption.previewImgUrl,
      price: this.productOption.price,
      quantity: this.productOption.quantity,
      colorId: this.productOption.colorId
    })
  }

  cancel() {
    this.dialog.closeAll()
  }
}
