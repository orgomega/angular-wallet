import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseURL="http://localhost:8090/user";
  constructor(private httpClient:HttpClient) { }
  updateUser(id: number, user: User): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,user);
  }
}
