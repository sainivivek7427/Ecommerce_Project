import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8081/api/products'
  
  constructor(private http:HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl+"/get");
  }
  updateProduct(productId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit/${productId}`, formData,{ responseType: 'text' });
  }
  deleteProduct(pid: string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/${pid}`,{ responseType: 'text' });
  }
}
