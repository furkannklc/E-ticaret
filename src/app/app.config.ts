
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import {provideHttpClient} from '@angular/common/http';
import {definePreset} from '@primeuix/themes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset:definePreset(Aura, {
          semantic: {
            primary: {
              400: '{yellow.400}',
              500: '{red.500}',
            }
          }
        })
      }
    })
  ]
};
