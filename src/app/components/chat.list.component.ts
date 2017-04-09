import { Component , EventEmitter, Input, Output, trigger, transition, style, animate} from '@angular/core';
import {SocketService} from '../service/socket.service';

/**
 * This class represents the toolbar component.
 */
@Component({
  selector: 'pic-chat-list',
  templateUrl: './chat.list.component.html',
  host: {
    '[style.display]': "'block'"

  }
})
export class ChatListComponent {
  myid:string = "";
  messages: any;
  show: boolean = false;
  chat: any = {message: "", id: ""};

  constructor(private socketService: SocketService) {
    this.messages = this.socketService.getMessages();
    this.myid = this.socketService.myid;
    this.chat.id = this.socketService.guidGenerator();
  }
  ngOnInit() {
  }

  checkChat() {
    if (this.chat.message > "") this.socketService.sendChat(this.chat);
    this.chat.message = "";
    this.chat.id = this.socketService.guidGenerator();
  }
  sendChat() {
    this.socketService.sendChat(this.chat);
  }
  ngOnDestroy() {
  }
}
