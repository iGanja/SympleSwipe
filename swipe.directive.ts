import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { fromEvent, map, zip } from 'rxjs';

@Directive({
  selector: '[sympleSwipe]'
})
export class SwipeDirective {

  @Output() sympleSwipe: EventEmitter<any> = new EventEmitter();

  constructor(
    private el: ElementRef
  ) {
    // check for touch enabled device
    const supportsTouch = matchMedia('(hover: none)').matches;

    if (supportsTouch) {
      const element = el.nativeElement;
      const touchStart = fromEvent(element, 'touchstart');
      const touchEnd = fromEvent(element, 'touchend');
      zip(touchStart, touchEnd)
        .pipe(
          map(([a, b]) => ({
            start: a as TouchEvent,
            end: b as TouchEvent
          }))
        )
        .subscribe((swipe) => {
          if (swipe.end.timeStamp - swipe.start.timeStamp < 1000) {
            var x = swipe.end.changedTouches[0]?.clientX - swipe.start.changedTouches[0]?.clientX;
            var y = swipe.end.changedTouches[0]?.clientY - swipe.start.changedTouches[0]?.clientY;
            if (Math.abs(x) > 20 && Math.abs(x) >= Math.abs(y)) // horizontal swipe
            {
              this.sympleSwipe.emit();
            }
          }

        });
    }
  }
}
