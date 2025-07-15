import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

// Add i18n configuration
import '@angular/localize/init';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
