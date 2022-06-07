import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Department } from 'src/app/models/department.model';
import { baseUrl } from 'src/globalVariables';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private departments = new BehaviorSubject<Department[]>([])

  get departments$(): Observable<Department[]> {
    return this.departments.asObservable()
  }

  async loadDepartments(): Promise<Department[]> {
    const url = baseUrl + '/products/departments'
    const departments = await firstValueFrom(this.http.get<any[]>(url))
    this.departments.next(departments)
    return departments
  }

  constructor(private http: HttpClient) { }

  selectedDepartment: Department | undefined
  getDepartments() {
    const url = baseUrl + '/products/departments'

    return firstValueFrom(this.http.get<Department[]>(url))

  }

  async getProductsByDepartment(departmentId: number, offset: number, rowCount: number) {

    const url = `${baseUrl}/products/limit`
    try {
      return firstValueFrom(this.http.get<any>(url, { params: { offset, rowCount, departmentId } }))
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getProductsByCategory(categoryId: number, offset: number, rowCount: number) {
    const url = `${baseUrl}/products/limit`
    try {
      return firstValueFrom(this.http.get<any>(url, { params: { offset, rowCount, categoryId } }))
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getProductsByUserSearch(searchWord: string, offset: number, rowCount: number) {
    const url = `${baseUrl}/products/limit`
    try {
      return firstValueFrom(this.http.get<any>(url, { params: { offset, rowCount, searchWord } }))
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getNewProducts(offset: number, rowCount: number) {
    const url = `${baseUrl}/products/limit`
    try {
      return firstValueFrom(this.http.get<any>(url, { params: { offset, rowCount, newCollection: true } }))
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  getProductCount(searchWord: string, departmentId: number, categoryId: number, newCollection: boolean) {
    let str: string
    if (searchWord) str = `searchWord=${searchWord}`
    if (departmentId) str = `departmentId=${departmentId}`
    if (categoryId) str = `categoryId=${categoryId}`
    if (newCollection) str = `newCollection=true`
    return firstValueFrom(this.http.get<{ count: number }>(`${baseUrl}/products/count?${str}`))
  }

}
