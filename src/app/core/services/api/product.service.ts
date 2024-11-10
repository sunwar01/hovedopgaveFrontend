import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';




@Injectable
({
  providedIn: 'root'
})


export class ProductService
{
  private baseUrl = 'http://localhost:5257/API/Products/';

  constructor(private http: HttpClient)
  {
  }

  GetProducts(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetProducts`);

  }

  GetProduct(id: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetProduct/${id}`);
  }

  CreateProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}CreateProduct`, product);
  }

  UpdateProduct(product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateProduct/${product.id}`, product);
  }

  DeleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteProduct/${id}`);
  }

  SoftDeleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}SoftDeleteProduct/${id}`, { responseType: 'text' });
  }

  RestoreProduct(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}RestoreProduct/${id}`, null);
  }




}
