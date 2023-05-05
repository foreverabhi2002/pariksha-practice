import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { interval } from 'rxjs';


@Directive({
  selector: '[appQuesPaletteBtnBg]'
})
export class QuesPaletteBtnBgDirective {

  @Input() action: string = "";
  interval$: any;
  constructor(private el: ElementRef, private render: Renderer2) {
    
    this.startCounter();
  }


  startCounter() {
    this.interval$ = interval(100)
      .subscribe(val => {
        
        
        if (this.action == "Answered") {
          this.render.setStyle(this.el.nativeElement, 'background', 'green');
          this.render.setStyle(this.el.nativeElement, 'color', '#fff');
          // this.render.setStyle(this.el.nativeElement, 'border', '2px solid grey');
        }
        // else {
        //   this.render.setStyle(this.el.nativeElement, 'background', 'white');
        //   this.render.setStyle(this.el.nativeElement, 'color', '#000');
        //   this.render.setStyle(this.el.nativeElement, 'border', '');
        // }
      });


  }

}
