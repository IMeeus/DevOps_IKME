import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuelApiService {

  constructor(private http: HttpClient) { }

  GetFuels(name: string = ""): Promise<Fuel[]> {
    return this.http.get<Fuel[]>(`${environment.apiUrl}/api/v1/fuels?name=${name}`).toPromise();
  }

  UpdateFuel(fuel: Fuel): Promise<Fuel> {
    return this.http.put<Fuel>(`${environment.apiUrl}/api/v1/fuels`, fuel).toPromise();
  }
}

export interface Fuel {
  id?: number;
  name: string;
  price: number;
  capacity: number;
  stability: number;
}