import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from 'src/app/models/department.model';
import { ProductsService } from 'src/app/services/products-service/products.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  departments: Department[] = []

  constructor(public productsService: ProductsService) {

  }

  ngOnInit(): void {
    this.getDepartments()
  }

  init() {

  }

  async getDepartments() {
    try {
      this.departments = await this.productsService.getDepartments()

    } catch (error) {
      console.log(error)
    }
  }
}
