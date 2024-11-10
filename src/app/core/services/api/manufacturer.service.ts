import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable
({
  providedIn: 'root'
})

export class ManufacturerService
{
  private baseUrl = 'http://localhost:5257/API/Manufacturer/';



  constructor(private http: HttpClient)
  {
  }

  GetManufacturers(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetManufacturers`);

  }

  GetManufacturer(id: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetManufacturer/${id}`);
  }

  CreateManufacturer(manufacturer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}CreateManufacturer`, manufacturer);
  }

  UpdateManufacturer(manufacturer: any): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateManufacturer/${manufacturer.id}`, manufacturer);
  }

  DeleteManufacturer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteManufacturer/${id}`);
  }

  SoftDeleteManufacturer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}SoftDeleteManufacturer/${id}`, { responseType: 'text' });
  }

  RestoreManufacturer(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}RestoreManufacturer/${id}`, null);
  }






}
