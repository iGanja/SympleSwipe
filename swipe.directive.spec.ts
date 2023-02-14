import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { SwipeDirective } from './swipe.directive';

describe('SwipeDirective', () => {
  it('should create an instance', () => {
    const el: ElementRef = {} as any;
    const directive = new SwipeDirective(el);
    expect(directive).toBeTruthy();
  });
});
