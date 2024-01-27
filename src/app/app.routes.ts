import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { PlaylistComponent } from './components/playlist.component';
import { PrinterComponent } from './components/printer.component';
import { AdminShareComponent } from './components/admin/admin-share/admin-share.component';
import { AdminCreateComponent } from './components/admin/admin-create/admin-create.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

export const routes: Routes = [
  { path: 'print', component: PrinterComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'create', component: AdminCreateComponent },
  { path: 'edit/:id', component: AdminCreateComponent },
  { path: 'share/:id', component: AdminShareComponent },
  { path: '', component: LandingpageComponent },
  { path: '**', component: LandingpageComponent },
];
