import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InfiniteScrollDirective, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
  items = Array.from({ length: 15 }, (_, i) => `Item ${i + 1}`);

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

  addItems() {
    this.items = [...this.items, ...Array.from({ length: 15 }, (_, i) => `Item ${this.items.length + i + 1}`)];
  }

  onReachedBottom() {
    console.log('reached bottom');
    this.addItems();
  }
}
