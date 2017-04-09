import { Component , EventEmitter, Input, Output,  trigger, transition, style, state, keyframes, animate} from '@angular/core';


@Component({
  selector: 'pic-default-page',
  templateUrl: './default.page.component.html',
  styleUrls: ['./home.component.css']
    ,
  animations: [
    trigger('enterAnimation', [
      state('*', style({transform: 'translateX(0)', opacity: 1})),
      transition('void => *', [
        animate('500ms ease-in-out', keyframes([
          style({opacity: 0, transform: 'translateY(-30px)', offset: 0, height: 0}),
          style({opacity: 1, transform: 'translateY(0)',  offset: 0.9,height:'*'})
        ]))
      ]),
      transition('* => void', [
        animate('500ms ease-in-out', keyframes([
          style({opacity: 1, transform: 'translateY(0)' , height:'*', offset: 0}),
          style({opacity: 0, transform: 'translateY(-30px)' ,  offset: 0.9,height: 0})
        ]))
      ])
    ])
  ]



})
export class DefaultPageComponent {

  private jigging: boolean = true;
  private chat: boolean = true;
  private map: boolean = true;
  private boat: boolean = true;
  private video: boolean = true;
  private camera: boolean = true;

  private jigging_visible: boolean = true;
  private chat_visible: boolean = true;
  private map_visible: boolean = true;
  private boat_visible: boolean = true;
  private video_visible: boolean = true;
  private camera_visible: boolean = true;


  constructor() { }

  ngOnInit() {
  }

}
