import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from './budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetServiceService {
  private baseURL="http://localhost:8090/api/budgets";
  constructor(private httpClient:HttpClient) { }
  getBudgetList(user_id:number):Observable<Budget[]>{
    return this.httpClient.get<Budget[]>(`${this.baseURL}/user/${user_id}`) ;
  }
  addBudget(budget:Budget):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,budget) ;
  } 
  getBudgetById(id: number): Observable<Budget>{
    return this.httpClient.get<Budget>(`${this.baseURL}/${id}`);
  }
  updateBudget(id: number, budget: Budget): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,budget);
  }
  deleteBudget(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  } 
}
