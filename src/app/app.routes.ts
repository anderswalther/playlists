import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin.component';
import { PlaylistComponent } from './components/playlist.component';
import { PrinterComponent } from './components/printer.component';

export const routes: Routes = [
  { path: 'print', component: PrinterComponent },
  { path: 'create', component: AdminComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: '', component: AdminComponent },
];
