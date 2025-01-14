import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerPostDto} from '../../models/customerRelated/dto/customerPost.dto';
import {CustomerUpdateDto} from '../../models/customerRelated/dto/customerUpdate.dto';
import {CaseUpdateDto} from '../../models/caseRelated/dto/caseUpdate.dto';


@Injectable
({
  providedIn: 'root'
})


export class CaseService
{

  private baseUrl = 'http://localhost:5257/API/Case/';

  constructor(private http: HttpClient)
  {

  }

  createCase(theCase: any): Observable<any>
  {
    return this.http.post(this.baseUrl + 'CreateCase', theCase);
  }

  getCase(id: number): Observable<any>
  {
    return this.http.get(this.baseUrl + 'GetCase/' + id);
  }


  getCases(): Observable<any>
  {
    return this.http.get(this.baseUrl + 'GetCases');
  }

  getLatestCasesByStoreId(storeId: number): Observable<any>
  {
    return this.http.get(this.baseUrl + 'GetLatestCasesByStoreId/' + storeId);
  }

  updateCase(theCase: any, caseUpdateDto: CaseUpdateDto): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateCase/${theCase.id}`, caseUpdateDto);
  }



}
