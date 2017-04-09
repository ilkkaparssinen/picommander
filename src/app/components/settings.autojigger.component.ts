import { Component , EventEmitter, Input, Output} from '@angular/core';

/**
 * This class represents the toolbar component.
 */
import {SocketService} from '../service/socket.service';

@Component({
  selector: 'pic-settings-autojigger',
  templateUrl: './settings.autojigger.component.html',
  host: {
    '[style.display]': "'block'"
  }

})
export class SettingsAutoJiggerComponent {

  private settings:any = {};

  constructor(private socketService: SocketService) {
    this.settings = this.socketService.settings;
  }
  ngOnInit() {
  }

  changes() {
    this.socketService.sendSettings();
  }
  ngOnDestroy() {
  }
}
