import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { MaterialModule } from '@angular/material';
import {SharedModule} from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule.forRoot(), RouterModule.forRoot(routes),
    HttpModule, HomeModule, CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
