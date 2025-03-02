import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PrinterComponent } from './components/printer.component';
import { AdminShareComponent } from './components/admin/admin-share/admin-share.component';
import { AdminCreateComponent } from './components/admin/admin-create/admin-create.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

export const routes: Routes = [
  { path: 'secretstuff', component: LandingpageComponent },
  { path: 'print', component: PrinterComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'create', component: AdminCreateComponent },
  { path: 'edit/:id', component: AdminCreateComponent },
  { path: 'share/:id', component: AdminShareComponent },
];
