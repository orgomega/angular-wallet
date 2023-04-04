import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carte } from './carte';

@Injectable({
  providedIn: 'root'
})
export class CarteServiceService {
  private baseURL="http://localhost:8090/api/cartes";
  constructor(private httpClient:HttpClient) { }
  getCarteList(user_id:number):Observable<Carte[]>{
    return this.httpClient.get<Carte[]>(`${this.baseURL}/user/${user_id}`) ;
  }
  addCarte(carte:Carte):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,carte) ;
  } 
  getCarteById(id: number): Observable<Carte>{
    return this.httpClient.get<Carte>(`${this.baseURL}/${id}`);
  }
  updateCarte(id: number, carte: Carte): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,carte);
  }
  deleteCarte(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }  
}
