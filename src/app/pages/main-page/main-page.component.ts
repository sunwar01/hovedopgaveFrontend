import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatCard} from '@angular/material/card';
import {Router} from '@angular/router';
import {CurrentUserService} from '../../core/services/currentUserService/currentUser.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent
{

  constructor(private router: Router, private currentUser: CurrentUserService)
  {
  }


  Logout()
  {
    this.currentUser.clearCurrentUser();
    this.router.navigate(['/login']);
  }



}
