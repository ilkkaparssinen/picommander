import { Component , EventEmitter, Input, Output} from '@angular/core';

/**
 * This class represents the toolbar component.
 */
import {SocketService} from '../service/socket.service';

@Component({
  selector: 'pic-settings-autocamera',
  templateUrl: './settings.autocamera.component.html',
  host: {
    '[style.display]': "'block'"
  }

})
export class SettingsAutoCameraComponent {

  private settings: any = {};
  private status: any = {};

  constructor(private socketService: SocketService) {
    this.settings = this.socketService.settings;
    this.status = this.socketService.status;
  }

  ngOnInit() {
  }

  autoOn() {
    this.settings.camera_mode = 1;
    this.socketService.sendSettings();


  }

  autoOff() {
    this.settings.camera_mode = 2;

    this.socketService.sendSettings();


  }

  takePhoto() {
    this.socketService.takeExternalPhoto();
  }

  changes() {
    this.socketService.sendSettings();
  }
  ngOnDestroy() {
  }
}
