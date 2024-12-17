import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerPostDto} from '../../models/customerRelated/dto/customerPost.dto';
import {CustomerUpdateDto} from '../../models/customerRelated/dto/customerUpdate.dto';


@Injectable
({
  providedIn: 'root'
})


export class CustomerService
{

  private baseUrl = 'http://localhost:5257/API/Customer/';

  constructor(private http: HttpClient)
  {

  }

  createCustomer(customer: any): Observable<any>
  {
    return this.http.post(this.baseUrl + 'CreateCustomer', customer);
  }


  getCustomers(): Observable<any>
  {
    return this.http.get(this.baseUrl + 'GetCustomers');
  }



  updateCustomer(customer: any, customerUpdateDto: CustomerUpdateDto): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateCustomer/${customer.id}`, customerUpdateDto);
  }



}
