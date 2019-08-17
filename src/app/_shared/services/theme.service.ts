import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public isDarkTheme = new BehaviorSubject<boolean>(false);
  cast = this.isDarkTheme.asObservable();

  setDarkTheme() {
    localStorage.setItem('theme', 'dark-theme');
    this.isDarkTheme.next(true);
    console.log(this.checkTheme());
  }

  setLightTheme() {
    localStorage.setItem('theme', 'light-theme');
    this.isDarkTheme.next(false);
    console.log(this.checkTheme());
  }

  checkTheme() {
    const theme: any = localStorage.getItem('theme');
    if (!theme || theme === undefined || theme === null) {
      console.log('reset to light theme');
      this.setLightTheme();
      return 'light-theme';
    } else {
      if (theme === 'dark-theme') {
        if (!this.isDarkTheme.value) {
          console.log('reset to dark theme');
          this.setDarkTheme();
        }
        return 'dark-theme';
      } else {
        if (this.isDarkTheme.value) {
          console.log('reset to light theme');
          this.setLightTheme();
        }
        return 'light-theme';
      }
    }
  }
}
