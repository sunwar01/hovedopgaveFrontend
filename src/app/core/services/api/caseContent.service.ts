import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerPostDto} from '../../models/customerRelated/dto/customerPost.dto';
import {CaseUpdateDto} from '../../models/caseRelated/dto/caseUpdate.dto';
import {CaseContentUpdateDto} from '../../models/caseContentRelated/dto/caseContentUpdateDto';


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


  updateCaseContent(caseContentUpdateDto : CaseContentUpdateDto): Observable<any>
  {
    return this.http.put(`${this.baseUrl}UpdateCaseContent/${caseContentUpdateDto.id}`, caseContentUpdateDto);
  }



}
