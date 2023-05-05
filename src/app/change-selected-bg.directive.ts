import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { interval } from 'rxjs';

@Directive({
  selector: '[appChangeSelectedBg]'
})
export class ChangeSelectedBgDirective {


  @Input() isSelected: Boolean = false;
  interval$: any;
  constructor(private el: ElementRef, private render: Renderer2) {
    
    this.startCounter();
  }
  
  @HostListener('click') answer() {

    this.render.setStyle(this.el.nativeElement, 'background', 'RoyalBlue');
    this.render.setStyle(this.el.nativeElement, 'color', '#fff');
    this.render.setStyle(this.el.nativeElement, 'border', '2px solid grey');

  }

  startCounter() {
    this.interval$ = interval(10)
      .subscribe(val => {
        
        if (this.isSelected) {
          this.render.setStyle(this.el.nativeElement, 'background', 'RoyalBlue');
          this.render.setStyle(this.el.nativeElement, 'color', '#fff');
          this.render.setStyle(this.el.nativeElement, 'border', '2px solid grey');
        }
        else {
          this.render.setStyle(this.el.nativeElement, 'background', 'white');
          this.render.setStyle(this.el.nativeElement, 'color', '#000');
          this.render.setStyle(this.el.nativeElement, 'border', '');
        }
      });


  }
}
