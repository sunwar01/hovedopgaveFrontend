import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable
({
  providedIn: 'root'
})


export class SubCategoryService
{
  private baseUrl = 'http://localhost:5257/API/SubCategory/';

  constructor(private http: HttpClient)
  {
  }

  GetSubCategories(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetSubCategories`);

  }

  GetSubCategory(id: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetSubCategory/${id}`);
  }

  CreateSubCategory(subCategory: any): Observable<any> {
    return this.http.post(`${this.baseUrl}CreateSubCategory`, subCategory);
  }

  UpdateSubCategory(subCategory: any): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateSubCategory/${subCategory.id}`, subCategory);
  }

  DeleteSubCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteSubCategory/${id}`);
  }

  SoftDeleteSubCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}SoftDeleteSubCategory/${id}`, { responseType: 'text' });
  }

  RestoreSubCategory(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}RestoreSubCategory/${id}`, null);
  }




}
