import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef , ViewContainerRef} from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import {   ModuleWithProviders } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule , ReactiveFormsModule }    from '@angular/forms';
import {MdCardModule} from '@angular/material';
import {MdTabsModule} from '@angular/material';
import {MdCheckboxModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';

import {MdInputModule} from '@angular/material';
import {MdSlideToggleModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdSliderModule} from '@angular/material';

import {SocketService} from '../service/socket.service';
import {FlexLayoutModule} from "@angular/flex-layout";
import {BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    imports:      [ MdCardModule,MdTabsModule,MdCheckboxModule,MdInputModule,MdSlideToggleModule,
        MdToolbarModule,MdSliderModule,MdButtonModule,
    BrowserModule, CommonModule,
        CommonModule, FormsModule
        ,FormsModule,ReactiveFormsModule,FlexLayoutModule,BrowserAnimationsModule
        ],
    declarations: [ ],
    exports:      [ MdCardModule,MdTabsModule,MdCheckboxModule,MdInputModule,MdSlideToggleModule,
        MdToolbarModule,MdSliderModule,MdButtonModule,
        CommonModule, FormsModule, ReactiveFormsModule,FlexLayoutModule,BrowserAnimationsModule]
})


export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ SocketService]
        };
    }
}



