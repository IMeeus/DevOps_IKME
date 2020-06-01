import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { AuthService } from '@services/auth.service.ts';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanApiService {

  constructor(
    private http: HttpClient,
    private authSvc: AuthService) { }

  GetAllPlans(name: string = '') {
    let uid = this.authSvc.GetCurrentUser().uid;
    return this.http.get<ApiPlan[]>(`${environment.apiUrl}/api/v1/plans?uid=${uid}&name=${name}`);
  }

  GetPlan(id: number) {
    return this.http.get<ApiPlan>(`${environment.apiUrl}/api/v1/plans/${id}`);
  }

  CreatePlan(newPlan : ApiPlan) {
    let uid = this.authSvc.GetCurrentUser().uid;
    newPlan.uid = uid;
    return this.http.post<ApiPlan>(`${environment.apiUrl}/api/v1/plans`, newPlan);
  }

  UpdatePlan(updPlan: ApiPlan) {
    let uid = this.authSvc.GetCurrentUser().uid;
    updPlan.uid = uid;
    return this.http.put<ApiPlan>(`${environment.apiUrl}/api/v1/plans`, updPlan);
  }

  DeletePlan(id: number) {
    return this.http.delete<ApiPlan>(`${environment.apiUrl}/api/v1/plans/${id}`);
  }
}

export interface QuarterData {
  total: number;
  sun: number;
  wind: number;
  nuclear: number;
  biomassa: number;
  steg: number;
  error: number;
}

export interface ApiPlan {
  id?: number;
  uid?: string;
  name: string;
  date: Date;
  data: QuarterData[];
}
