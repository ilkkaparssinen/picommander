
import {Injectable, Inject} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable"
import { Component, EventEmitter, Input, Output , ViewChild} from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class SocketService {

  public settingsChanged = new EventEmitter();
  public statusChanged = new EventEmitter();
  public imageChanged  = new EventEmitter();
  public photoReceived  = new EventEmitter();
  public messagesChanged  = new EventEmitter();

  public myid: string = "";
  public topic: string = "TEST";
  public status = {};
  public settings: any = {};
  public messages: any = [{who: "PI", message: "Huuhaa"},{who: "MOEBODY", message: "Juu"}];
  public photo: any = "";
  private online: boolean = false;
  private host:any = window.document.location.host.replace(/:.*/, '');
  private ws:any;

  constructor() {
    // this.host = "52.51.75.200";
    this.host = "localhost";
    this.reconnect();
    this.myid = this.guidGenerator();


  }

  connect(): void {
    this.ws = new WebSocket('ws://' + this.host + ':8080');

    this.ws.onopen = (event:Event) => {

      this.online = true;
      this.ws.onmessage = (event) => {
        this.onmessage(event);
      };
      this.ws.onclose = (event) => {
        this.online = false;
        this.reconnect();
      };
      this.ws.send(JSON.stringify({topic: this.topic,type: 'CLIENT', action: 'SUBSCRIBE'}));
      this.sendChat({message: "Web client started for boat:" + this.topic, id: ""});
    };
  }
  reconnect(){
    if (!this.online) {
      setTimeout(() => this.reconnect()
      , 5000);
    }
    if (!this.online) this.connect();

  }

  getSettings(): any {
    return this.settings;
  }
  getStatus(): any {
    return this.status;
  }
  getMessages(): any {
    return this.messages;
  }
  sendSettings(): void {
    if (!this.online) return;

    var message: any= {};
    Object.assign(message, this.settings);
    message.topic = this.topic;
    message.action = "SETTINGS";
    this.ws.send(JSON.stringify(message));
    console.log("Sended settings");
    console.log(this.settings);
  }

  sendChat(chat): void {
    if (!this.online) return;
    console.log("SEND CHAT");
    var message: any= {};
    message.topic = this.topic;
    message.action = "MESSAGE";
    message.message = chat.message;
    message.who = this.myid;
    message.id = chat.id;
    this.ws.send(JSON.stringify(message));
  }

  takeExternalPhoto(): void {
    if (!this.online) return;
    var message: any= {};
    message.topic = this.topic;
    message.action = "EXTERNALPHOTO";
    message.who = this.myid;
    this.ws.send(JSON.stringify(message));
  }

  requestPhoto(): void {
    if (!this.online) return;

    var message: any= {};
    message.topic = this.topic;
    message.action = "TAKEPHOTO";
    message.who = this.myid;
    this.ws.send(JSON.stringify(message));
  }
  getPhoto(): any {
    return this.photo;
  }
  onmessage(event): void {
    var data = JSON.parse(event.data);

    if (data.action === 'STATUS') {
      Object.assign(this.status, data);
      this.statusChanged.emit(this.status);

    }
    if (data.action === 'SETTINGS') {
      Object.assign(this.settings, data);
      this.settingsChanged.emit(this.settings);
      console.log("Settings received");
      console.log(this.settings);

    }
    if (data.action === 'PHOTO') {
      this.photo =  data.image;
      this.photoReceived.next(data.image);
    }
    if (data.action === 'MESSAGE') {
      if (!data.who) data.who = "";
      if (data.id && data.id > "") {
        let found = false;
        // Update existing data
        for (let i = 0; i < this.messages.length; i++) {
          if (this.messages[i].id === data.id) {
            this.messages[i].message = data.message;
            found = true;

            break;
          }
        }
        if (!found)  {
          this.messages.unshift({message: data.message, id: data.id, who: data.who});
        }
      } else {
        this.messages.unshift({message: data.message, id: "", who: data.who});
      }

      if (this.messages.length > 20) {
        this.messages.splice(this.messages.length - 1,1);
      }
      this.messagesChanged.next(data.image);
    }
    if (data.action === 'IMAGE') {
      this.imageChanged.next(data.image);
    }
  }

  guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

}


