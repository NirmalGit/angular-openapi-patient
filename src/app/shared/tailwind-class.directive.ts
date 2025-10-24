import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[twClass]',
  standalone: true
})
export class TailwindClassDirective implements OnInit {
  @Input('twClass') twClass = '';
  constructor(private el: ElementRef) {}
  ngOnInit() {
    if (this.twClass) {
      this.el.nativeElement.className += ' ' + this.twClass;
    }
  }
}
