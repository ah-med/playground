import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfiniteScrollDirective } from './infinite-scroll.directive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InfiniteScrollDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  logScrollInfo() {
    console.table({
      'window.innerHeight': window.innerHeight,
      'window.scrollY': window.scrollY,
      'document.documentElement.scrollHeight':
        document.documentElement.scrollHeight,
      'window.scrollY + window.innerHeight':
        window.scrollY + window.innerHeight,
    });
  }

  onReachedBottom() {
    console.log('reached bottom');
    // this.logScrollInfo();
  }
}
