import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    // Angular 20: Enhanced HTTP client with fetch API
    provideHttpClient(withFetch()),

    // Angular 20: Enhanced router with blocking initial navigation and in-memory scrolling
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(), // Prevents navigation until app is stable
      withInMemoryScrolling({
        scrollPositionRestoration: 'top', // Scroll to top on navigation
        anchorScrolling: 'enabled' // Enable anchor scrolling
      })
    )
  ]
})
  .catch((err) => console.error(err));
