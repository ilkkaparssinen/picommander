/*
Google graph - original version from:
   https://github.com/vimalavinisha/angular2-google-chart
Inserted timeline support +
 */
import { Component, EventEmitter, ElementRef, Input, Output, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {SocketService} from '../service/socket.service';

declare var google:any;

@Component({
  selector: 'pic-map',
    host: {
        '[style.display]': "'block'"
    },
  template: `<div style="position:relative;width:100%;min-height:300px;">
      <div  #mapPlace style="height:300px;width:100%;"></div>
    <i id="directionarrow" class="fa fa-arrow-up maparrow" style="font-size:4em;position:absolute;top:45%;left:48%;" aria-hidden="true">
    </i>
    <div id="speedtext" class="speedtext" style="position:absolute;top:45%;left:48%;">
             {{calcspeed}} km/h
    </div>
    </div>

  `

})

export class GoogleMapComponent {
  public map: any;
  @ViewChild('mapPlace') mapPlace: any;
  public calcspeed = 0;
  public status = {latitude: 62.0, longitude: 20.0, speed: 0.0};


  ngOnInit() {

  }
  ngAfterViewInit() {
    this.onStatusChanged();
  }

  constructor(public socketService: SocketService) {
    this.status = socketService.getStatus();
    socketService.statusChanged.subscribe((data) => {
      this.onStatusChanged();
    });
  }

  onStatusChanged():void {

   //  if (!this.status['longitude']) return;
   // Test
    this.status.longitude = 28.239;
    this.status.latitude = 61.609;
    // Take markers out
  /*
    if (this.markers.length > 20) {
      this.markers.splice(this.markers.length - 1,1);
    }

    this.markers.unshift({lat: this.status['latitude'],
      lng: this.status['longitude'], draggable: false,
      iconUrl: 'assets/png/ship.png'
    });
*/
    var dirimage: any = document.getElementById('directionarrow');
    if (!dirimage) return;

    dirimage.style.transform='rotate(' + this.status["track"] + 'deg)';
    var speedtext: any = document.getElementById('speedtext');
    if (this.status.speed) this.calcspeed = Math.round(this.status['speed'] * 36) / 10.0;

    this.showMap(this.status.latitude, this.status.longitude);
    //  speedtext.style.transform='rotate(' + this.status["track"] + 'deg)';
  }



  showMap (latitude, longitude) {
    setTimeout(() =>  {
      var mapOptions = {
        zoom: 14,
      };

      if (!this.map) this.map = new google.maps.Map(this.mapPlace.nativeElement, mapOptions);
      this.map.setCenter({ lat: latitude, lng: longitude });
      var marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: this.map,
        title: ""
      });
      google.maps.event.trigger(this.map, 'resize');


    }, 500);

  }
}
