import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  themeTitle = 'Dark';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  // tslint:disable-next-line: variable-name
  constructor(private _theme: ThemeService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this._theme.checkTheme();
    this.isDarkTheme = this._theme.isDarkTheme;
    this.setThemeTitle();
  }

  toggleTheme() {
    if (this._theme.isDarkTheme.value) {
      this._theme.setLightTheme();
    } else {
      this._theme.setDarkTheme();
    }
    console.log(this._theme.isDarkTheme.value);
    this.setThemeTitle();
  }

  setThemeTitle() {
    if (this._theme.isDarkTheme.value) {
      this.themeTitle = 'Light';
    } else {
      this.themeTitle = 'Dark';
    }
  }
}
