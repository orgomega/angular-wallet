import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dette } from './dette';

@Injectable({
  providedIn: 'root'
})
export class DetteServiceService {
  private baseURL="http://localhost:8090/api/dettes";
  constructor(private httpClient:HttpClient) { }
  getDetteList(user_id:number):Observable<Dette[]>{
    return this.httpClient.get<Dette[]>(`${this.baseURL}/user/${user_id}`) ;
  }
  addDette(dette:Dette):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,dette) ;
  } 
  getDetteById(id: number): Observable<Dette>{
    return this.httpClient.get<Dette>(`${this.baseURL}/${id}`);
  }
  updateDette(id: number, dette: Dette): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,dette);
  }
  deleteDette(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }  
}
