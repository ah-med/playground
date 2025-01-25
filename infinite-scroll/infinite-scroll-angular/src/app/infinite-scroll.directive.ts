import {
  Directive,
  EventEmitter,
  Output,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor() {}

  @Output() reachedBottom = new EventEmitter<void>();

  @Input() debounceTime = 100;

  previousScrollY = window.scrollY;

  ngOnInit() {
    const scrolls = fromEvent(window, 'scroll');
    scrolls
      .pipe(debounceTime(this.debounceTime), takeUntil(this.destroy$))
      .subscribe(() => {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
          console.log(
            'window.innerHeight + window.scrollY >= document.body.scrollHeight',
            window.innerHeight,
            window.scrollY,
            document.body.scrollHeight
          );
          this.onReachedBottom();
        }
        this.previousScrollY = window.scrollY;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onReachedBottom() {
    this.reachedBottom.emit();
  }
}
