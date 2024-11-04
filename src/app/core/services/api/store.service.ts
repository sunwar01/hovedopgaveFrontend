import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable
({
  providedIn: 'root'
})

export class StoreService
{
  private baseUrl = 'http://localhost:5257/API/Stores/';



    constructor(private http: HttpClient)
    {
    }

    GetStores(): Observable<any>
    {
      return this.http.get(`${this.baseUrl}GetStores`);
    }





}
