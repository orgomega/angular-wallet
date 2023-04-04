import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Depense } from './depense';

@Injectable({
  providedIn: 'root'
})
export class DepensesServicesService {
  private baseURL="http://localhost:8090/api/depenses";
  constructor(private httpClient:HttpClient) { }
  getDepenseList(user_id:number):Observable<Depense[]>{
    return this.httpClient.get<Depense[]>(`${this.baseURL}/user/${user_id}`) ;
  }
  addDepense(Depense:Depense):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,Depense) ;
  } 
  getDepenseById(id: number): Observable<Depense>{
    return this.httpClient.get<Depense>(`${this.baseURL}/${id}`);
  }
  updateDepense(id: number, Depense: Depense): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,Depense);
  }
  deleteDepense(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }  
}
