import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'playlists-21cc0',
          appId: '1:699979649178:web:62966ab1921417ed18cf23',
          storageBucket: 'playlists-21cc0.appspot.com',
          apiKey: 'AIzaSyD0p-ODD7lio06yHKFx6Ulu-Zdx20pjP10',
          authDomain: 'playlists-21cc0.firebaseapp.com',
          messagingSenderId: '699979649178',
        })
      )
    ),
    //TODO, might need to enablethis again: importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
