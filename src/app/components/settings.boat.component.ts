import { Component , EventEmitter, Input, Output} from '@angular/core';
import {SocketService} from '../service/socket.service';

/**
 * This class represents the toolbar component.
 */
@Component({
  selector: 'pic-settings-boat',
  templateUrl: './settings.boat.component.html',
  host: {
    '[style.display]': "'block'"
  }

})
export class SettingsBoatComponent {

  private settings:any = {};

  constructor(private socketService: SocketService) {
    this.settings = this.socketService.getSettings();
  }
  ngOnInit() {
  }
  changes() {
    this.socketService.sendSettings();

  }

  ngOnDestroy() {
  }
}
