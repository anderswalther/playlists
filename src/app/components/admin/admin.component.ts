import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Playlist, Song } from '../../models/playlist';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../../services/playlist-service';
import emailjs from '@emailjs/browser';
import { PrinterComponent } from '../printer.component';
import { ToastrService } from 'ngx-toastr';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminShareComponent } from './admin-share/admin-share.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  styleUrls: ['./admin.component.css'],
  template: ``,
})
export class AdminComponent {
  @Input()
  set id(id: string) {
    this.loadPlaylist(id);
  }

  playlist: Playlist = Playlist.emptyPlaylist();

  constructor(
    protected playlistService: PlaylistService,
    protected router: Router,
    protected toastr: ToastrService
  ) {}

  onMailSend() {
    this.toastr.success('Mail has been send!');
  }

  onMailFailed() {
    this.toastr.warning('Something went wrong');
  }

  async loadPlaylist(id: string) {
    this.playlist = await this.playlistService.getPlaylist(id);
  }
}
