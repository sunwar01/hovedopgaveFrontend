import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CounterReportUpdateDto} from '../../models/counterReportRelated/dto/counterReportUpdate.dto';

@Injectable
({
  providedIn: 'root'
})

export class CounterReportService
{
  private baseUrl = 'http://localhost:5257/API/CounterReport/';



  constructor(private http: HttpClient)
  {
  }

  GetLatestCounterReportById(counterId: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetLatestCounterReport/${counterId}`);
  }

  createCounterReport(counterReport: any): Observable<any>
  {
    return this.http.post(`${this.baseUrl}CreateCounterReport`, counterReport);
  }


  updateCounterReport(counterReport: any, counterReportUpdateDto: CounterReportUpdateDto): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateCounterReport/${counterReport.id}`, counterReportUpdateDto);
  }






}
