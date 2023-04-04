import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compte } from './compte';

@Injectable({
  providedIn: 'root'
})
export class CompteServiceService {
  private baseURL="http://localhost:8090/api/comptes";
  constructor(private httpClient:HttpClient) { }
  getCompteList(user_id:number):Observable<Compte[]>{
    return this.httpClient.get<Compte[]>(`${this.baseURL}/user/${user_id}`) ;
  }
  addCompte(compte:Compte):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,compte) ;
  } 
  getCompteById(id: number): Observable<Compte>{
    return this.httpClient.get<Compte>(`${this.baseURL}/${id}`);
  }
  updateCompte(id: number, compte: Compte): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,compte);
  }
  deleteCompte(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  } 
}
