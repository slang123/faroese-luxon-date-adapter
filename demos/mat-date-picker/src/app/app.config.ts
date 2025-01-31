import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideFaroeseDateAdapter} from '@slang123/faroese-date-adapter';
import {provideAnimations} from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFaroeseDateAdapter(),
    provideAnimations(), provideAnimationsAsync()
  ],
};
