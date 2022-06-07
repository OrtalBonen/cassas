import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { baseUrl } from 'src/globalVariables';
import { City } from '../models/citiy.model';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  async getCities(): Promise<City[]> {
    try {
      const url = baseUrl + '/cities'
      const cities = await firstValueFrom(this.http.get<City[]>(url))
      return cities
    } catch (error) {
      console.log(error)
      throw error
    }
  }

}
