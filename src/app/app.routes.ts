import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PlaylistComponent } from './playlist/playlist.component';

export const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
  { path: '', component: AdminComponent },
];
