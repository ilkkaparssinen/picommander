/*
  Common simple components / templates
 */
import { CommonModule }   from '@angular/common';
import { NgModule }       from '@angular/core';
import { VideoComponent} from './video.component';
import { FormsModule , ReactiveFormsModule }    from '@angular/forms';
import { ChatListComponent} from './chat.list.component';
import { GoogleMapComponent} from './googlemap.component';

import { SettingsBoatComponent} from './settings.boat.component';
import { SettingsAutoCameraComponent} from './settings.autocamera.component';

import { SharedModule } from '../shared/shared.module';

import { SettingsAutoJiggerComponent} from './settings.autojigger.component';

@NgModule({
  imports: [
   CommonModule,  FormsModule, SharedModule
  ],
  declarations: [
    VideoComponent,SettingsAutoJiggerComponent, ChatListComponent, SettingsBoatComponent, GoogleMapComponent, SettingsAutoCameraComponent
  ],
  providers: [
  ],
  entryComponents: [],
  exports: [ VideoComponent,SettingsAutoJiggerComponent,ChatListComponent, SettingsBoatComponent, GoogleMapComponent, SettingsAutoCameraComponent]
})

export class ComponentsModule {}
