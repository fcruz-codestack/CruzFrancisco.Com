import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ThemeService } from './_shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'CruzFrancisco.COM';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  isDarkTheme: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver,
              private theme: ThemeService) {}

  ngOnInit() {
    this.theme.checkTheme();
    this.isDarkTheme = this.theme.isDarkTheme;
  }
}
