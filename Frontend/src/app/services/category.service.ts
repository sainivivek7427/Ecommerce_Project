import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'app/models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

private baseUrl = 'http://localhost:8081/api/categories'
  
  constructor(private http:HttpClient) { }

  getCategoryById(cid:string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/get/${cid}`);
  }
}
