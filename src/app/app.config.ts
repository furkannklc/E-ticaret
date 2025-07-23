
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import {provideHttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import Lara from '@primeuix/themes/lara';

export const appConfig: ApplicationConfig = {
  providers: [MessageService,
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Lara,options: {
          // Karanlık modu manuel olarak class üzerinden kontrol edeceğiz
          darkModeSelector: '.app-dark'
        }
      }
    })
  ]
};
