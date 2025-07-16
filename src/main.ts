import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { routes } from './app/app.routes'; // <--- route'ları import et

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideRouter(routes), // <-- Burası kritik!
  ]
}).catch((err) => console.error(err));
