
import {SocketService} from '../service/socket.service';
import { Component , EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'pic-video',
  templateUrl: './video.component.html',
  host: {
    '[style.display]': "'block'"
  }
})
export class VideoComponent  {
  private lastImage: any;
  photoRequested: boolean = false;
  @ViewChild('canvas') canvas: any;
  @ViewChild('canvasContainer') canvasContainer: any;

  constructor(public socketService: SocketService) {
    this.socketService = socketService;
    this.socketService.imageChanged.subscribe(image => this.changeImage(image));
  }
  public ngAfterViewInit(): any {
    this.initImage();
  }
  initImage() {
    var canvas: any = this.canvas.nativeElement;
    var container: any = this.canvasContainer.nativeElement;

    var context = canvas.getContext('2d');
    var rect = container.getBoundingClientRect();


    let width = Math.min(rect.width,rect.height / 0.75);
    let height = width * 0.75;
    console.log(width);
    canvas.width = width;
    canvas.height = height;

    context.width = width;
    context.height = height;
    var img = new Image;
    img.onload = function(){
      context.drawImage(img,0,0,width,height);

    };
    img.src = "/assets/img/videotest.png";
  }
  onResize(event) {
    if (!this.lastImage) this.initImage();
    else this.changeImage(this.lastImage);
  }
  requestPhoto(event) {
    if (this.photoRequested) return; // Prevent multiple
    this.photoRequested = true;
    this.socketService.requestPhoto();
    setTimeout(function() {
      this.photoRequested = false;
    }.bind(this), 3000);
  }

  changeImage(image) {
    this.lastImage = image;
    var canvas: any = document.getElementById('videostream');
    if (!canvas) return;
    var rect = canvas.getBoundingClientRect();
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.src = 'data:image/jpeg;base64,'+image;
    imageObj.onload = function(){
      context.height = rect.height ;
      context.width = rect.width;
      context.drawImage(imageObj,0,0,context.width,context.height);
    }
  }
}
