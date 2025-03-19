import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Angular';
  showForm = true;

  sampleForm = new FormGroup({
    something: new FormControl('', [Validators.required]),
  });

  items = [1, 2, 3, 4];
  activeDotId = 0;
  intervalId: any;

  ngOnInit(): void {
    this.setUpCarousel();
  }

  setUpCarousel() {
    const updateActiveDotId = () => {
      if (this.activeDotId === this.items.length - 1) {
        this.activeDotId = 0;
      } else {
        this.activeDotId = this.activeDotId + 1;
      }
    };

    this.intervalId = setInterval(updateActiveDotId, 8000);
  }

  destroyCarousel() {
    clearInterval(this.intervalId);
  }

  ngOnDestroy() {
    this.destroyCarousel();
  }
}
