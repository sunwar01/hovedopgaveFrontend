import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable
({
  providedIn: 'root'
})

export class SupplierService
{
  private baseUrl = 'http://localhost:5257/API/Supplier/';



  constructor(private http: HttpClient)
  {
  }

  GetSuppliers(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetSuppliers`);

  }

  GetSupplier(id: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetSupplier/${id}`);
  }

  CreateSupplier(manufacturer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}CreateSupplier`, manufacturer);
  }

  UpdateSupplier(manufacturer: any): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateSupplier/${manufacturer.id}`, manufacturer);
  }

  DeleteSupplier(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteSupplier/${id}`);
  }

  SoftDeleteSupplier(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}SoftDeleteSupplier/${id}`, { responseType: 'text' });
  }

  RestoreSupplier(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}RestoreSupplier/${id}`, null);
  }






}
