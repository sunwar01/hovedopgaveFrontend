import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable
({
  providedIn: 'root'
})


export class CaseNotesService
{

  private baseUrl = 'http://localhost:5257/API/CaseNotes/';

  constructor(private http: HttpClient)
  {

  }

  createCaseNotes(caseNote: any): Observable<any>
  {
    console.log(" payload" + caseNote);
    return this.http.post(this.baseUrl + 'CreateCaseNote', caseNote);
  }

  getCaseNote(id: number): Observable<any>
  {
    return this.http.get(this.baseUrl + 'GetCaseNote/' + id);
  }

  getCaseNotes(): Observable<any>
  {
    return this.http.get(this.baseUrl + 'GetCaseNotes');
  }






}
