import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DefaultPageComponent } from './default.page.component';
import { AboutComponent } from './about.component';
import {BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {ComponentsModule} from '../components/components.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, ComponentsModule,
    HomeRoutingModule, SharedModule,BrowserAnimationsModule
  ],
  declarations: [HomeComponent,DefaultPageComponent,AboutComponent]
})
export class HomeModule { }
