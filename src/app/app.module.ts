import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MaterialModule} from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { MainNavComponent } from './_shared/components/main-nav/main-nav.component';
import { SideNavComponent } from './_shared/components/side-nav/side-nav.component';
import { CustomDialogComponent } from './_shared/components/custom-dialog/custom-dialog.component';
import { AboutComponent } from './views/about/about.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { ResumeComponent } from './views/resume/resume.component';
import { ContactComponent } from './views/contact/contact.component';
import { CrmComponent } from './views/projects/crm/crm.component';
import { InventoryComponent } from './views/projects/inventory/inventory.component';
import { SitesComponent } from './views/projects/sites/sites.component';
import { WeatherComponent } from './views/projects/weather/weather.component';
import { SportsComponent } from './views/projects/sports/sports.component';
import { TriviaComponent } from './views/projects/trivia/trivia.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    SideNavComponent,
    CustomDialogComponent,
    AboutComponent,
    ProjectsComponent,
    ResumeComponent,
    ContactComponent,
    CrmComponent,
    InventoryComponent,
    SitesComponent,
    WeatherComponent,
    SportsComponent,
    TriviaComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialModule,
    FlexLayoutModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
