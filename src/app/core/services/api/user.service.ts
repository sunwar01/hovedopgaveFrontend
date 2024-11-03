import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable
({
  providedIn: 'root'
})


export class UserService
{

  private baseUrl = 'http://localhost:5257/API/Users/';

  constructor(private http: HttpClient)
  {

  }


  ValidateLogin(username: string, password: string): Observable<any>
  {

    const content =
      {

      username: username,
      password: password,
    }


    return this.http.post(this.baseUrl + "ValidateLogin", content);


  }



}
