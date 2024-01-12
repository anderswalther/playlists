import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin.component';
import { PlaylistComponent } from './components/playlist.component';

export const routes: Routes = [
  { path: 'create', component: AdminComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: '', component: AdminComponent },
];
