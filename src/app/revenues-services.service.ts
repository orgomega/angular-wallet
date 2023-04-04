import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Revenue } from './revenue';

@Injectable({
  providedIn: 'root'
})
export class RevenuesServicesService {
  private baseURL="http://localhost:8090/api/revenues";
  constructor(private httpClient:HttpClient) { }
  getRevenueList(user_id:number):Observable<Revenue[]>{
    return this.httpClient.get<Revenue[]>(`${this.baseURL}/user/${user_id}`) ;
  }
  addRevenue(Revenue:Revenue):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,Revenue) ;
  } 
  getRevenueById(id: number): Observable<Revenue>{
    return this.httpClient.get<Revenue>(`${this.baseURL}/${id}`);
  }
  updateRevenue(id: number, Revenue: Revenue): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,Revenue);
  }
  deleteRevenue(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }  
}
