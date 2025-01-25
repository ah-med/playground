import { Directive, EventEmitter, HostListener, Output } from '@angular/core';


@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {

  constructor() {}

  @Output() reachedBottom = new EventEmitter<void>();

  // use Hostlistener to listen for the window scroll event
  @HostListener('window:scroll')
  onScroll() {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      console.log('window.innerHeight + window.scrollY >= document.body.scrollHeight', window.innerHeight, window.scrollY, document.body.scrollHeight);
      this.onReachedBottom();
    }
  }

  onReachedBottom() {
    this.reachedBottom.emit();
  }
}
