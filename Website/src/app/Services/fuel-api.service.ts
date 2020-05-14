import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuelApiService {

  constructor(private http: HttpClient) { }

  GetFuels(name: string = ""): Promise<Fuel[]> {
    return this.http.get<Fuel[]>(`http://localhost:44725/api/v1/fuels?name=${name}`).toPromise();
  }

  UpdateFuel(fuel: Fuel): Promise<Fuel> {
    return this.http.put<Fuel>(`http://localhost:44725/api/v1/fuels`, fuel).toPromise();
  }
}

export interface Fuel {
  id?: number;
  name: string;
  price: number;
  capacity: number;
  stability: number;
}