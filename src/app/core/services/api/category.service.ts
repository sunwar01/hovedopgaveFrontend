import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable
({
  providedIn: 'root'
})


export class CategoryService
{
  private baseUrl = 'http://localhost:5257/API/Category/';

  constructor(private http: HttpClient)
  {
  }

  GetCategories(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetCategories`);

  }

  GetCategory(id: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetCategory/${id}`);
  }

  CreateCategory(category: any): Observable<any> {
    return this.http.post(`${this.baseUrl}CreateCategory`, category);
  }

  UpdateCategory(category: any): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateCategory/${category.id}`, category);
  }

  DeleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteCategory/${id}`);
  }

  SoftDeleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}SoftDeleteCategory/${id}`, { responseType: 'text' });
  }

  RestoreCategory(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}RestoreCategory/${id}`, null);
  }




}
