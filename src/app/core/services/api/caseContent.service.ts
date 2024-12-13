import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerPostDto} from '../../models/customerRelated/dto/customerPost.dto';


@Injectable
({
  providedIn: 'root'
})


export class CaseContentService
{

  private baseUrl = 'http://localhost:5257/API/CaseContent/';

  constructor(private http: HttpClient)
  {

  }

  createCaseContent(caseContent: any): Observable<any>
  {
    console.log(" payload" + caseContent);
    return this.http.post(this.baseUrl + 'CreateCaseContent', caseContent);
  }

  getCaseContent(id: number): Observable<any>
  {
    return this.http.get(this.baseUrl + 'GetCaseContent/' + id);
  }


  getCaseContents(): Observable<any>
  {
    return this.http.get(this.baseUrl + 'GetCaseContent');
  }



}
