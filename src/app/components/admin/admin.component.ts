import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Playlist, Song } from '../../models/playlist';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../../services/playlist-service';
import emailjs from '@emailjs/browser';
import { PrinterComponent } from '../printer.component';
import { ToastrService } from 'ngx-toastr';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminShareComponent } from './admin-share/admin-share.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, PrinterComponent, AdminCreateComponent, AdminShareComponent],
  styleUrls: ['./admin.component.css'],
  template: `
    @if (creatingPlaylist) {
      <h1>Create a playlist</h1>
      <app-admin-create [model]="model" (playlistSubmitted)="onSavePlaylist($event)"></app-admin-create>
    } @else if (sharingPlaylist) {
      <h1>Your playlist is ready!</h1>
      <app-admin-share
        [model]="model"
        (mailHasBeenSend)="onMailSend()"
        (mailCouldNotBeSend)="onMailFailed()"
      ></app-admin-share>
    } @else {
      <p>It's away! Enjoy :)</p>
    }
  `,
})
export class AdminComponent implements OnInit {
  model: Playlist = Playlist.emptyPlaylist();

  creatingPlaylist = true;
  sharingPlaylist = false;

  constructor(
    private playlistService: PlaylistService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {}

  onSavePlaylist(playlist: Playlist) {
    this.model = playlist;
    this.playlistService.addPlaylist(this.model).then(() => {
      this.creatingPlaylist = false;
      this.sharingPlaylist = true;
    });
  }

  onMailSend() {
    this.toastr.success('Mail has been send!');
  }

  onMailFailed() {
    this.toastr.warning('Something went wrong');
  }
}
