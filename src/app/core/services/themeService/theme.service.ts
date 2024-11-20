import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  private darkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkThemePreference());


  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {


    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      this.setTheme(event.matches);
    });

  }


  private checkThemePreference(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }


  setTheme(isDarkMode: boolean): void {
    document.body.classList.toggle('dark-theme', isDarkMode);
    document.body.classList.toggle('light-theme', !isDarkMode);
    this.darkModeSubject.next(isDarkMode);
  }


  initializeTheme(): void {
    this.setTheme(this.darkModeSubject.value);
  }
}
