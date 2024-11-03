import {Injectable} from '@angular/core';
import {CookiesService} from '../cookiesService/cookies.service';
import {UserModel} from '../../models/userRelated/user.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CurrentUserService
{

  private currentUserSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  public currentUser$: Observable<UserModel | null> = this.currentUserSubject.asObservable();


  public currentToken: string = 'invalid token';


  constructor(private cookiesService: CookiesService)
  {
    this.loadCurrentUser();
  }



  private loadCurrentUser(): void{

    const user = this.cookiesService.getCookie('currentUser');
    if (user)
    {
      this.setCurrentUser(JSON.parse(user), 1);


    }
  }


  public getCurrentUser():Observable<UserModel | null>
  {
    return this.currentUserSubject;
  }


  public setCurrentUser(user: UserModel | null, days: number): void {
    this.currentUserSubject.next(user);
    this.cookiesService.setCookie('currentUser', JSON.stringify(user), days);
  }

  public clearCurrentUser(): void
  {
    this.setCurrentUser(null, 0);
    this.cookiesService.deleteCookie('currentUser');
    this.deleteToken();

  }


  public getToken(): string
  {

    if (!this.currentToken)
    {
      const token = this.cookiesService.getCookie('token');
      if (token)
      {
        this.currentToken = JSON.parse(token);
      }
    }
    return this.currentToken;
  }

  public setToken(token: string, days: number): void
  {
    this.currentToken = token;
    this.cookiesService.setCookie("token", token, days);
  }

  public deleteToken(): void
  {
    this.currentToken = 'invalid token';
    this.cookiesService.deleteCookie("token");
  }

}
