import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ProductsListComponent } from '../components/products-list/products-list.component';
import { City } from '../models/citiy.model';
import { Color } from '../models/color.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {




  getColors() {
    const colorsUrl = 'http://localhost:8080/products/colors'

    return firstValueFrom(this.http.get<Color[]>(colorsUrl))
  }

  // private handleError(error: HttpErrorResponse) {
  //   console.log(error)
  //   return throwError(() => new Error('Something bad happened; please try again later.'))
  // }








  constructor(private http: HttpClient) { }
}
