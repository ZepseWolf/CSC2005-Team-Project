import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  constructor() { }

  public closeCurtain():void{
    let left = document.getElementById('left-curtain') as any;
    let right = document.getElementById('right-curtain') as any;
    let fill = document.getElementById('loader_fill') as any;
    left.style.animation = "";
    right.style.animation = "";
    fill.style.animation = "";
  }

  public openCurtain():void{
    let left = document.getElementById('left-curtain') as any;
    let right = document.getElementById('right-curtain') as any;
    let fill = document.getElementById('loader_fill') as any;
    left.style.animation = "curtain-move-left 500ms ease forwards 500ms,background_fill 200ms ease forwards";
    right.style.animation = "curtain-move-right 500ms ease forwards 500ms";
    fill.style.animation = "border_fill 200ms ease forwards";
  }
}
