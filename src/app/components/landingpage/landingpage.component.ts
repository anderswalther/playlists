import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Welcome to Share-playlists</h1>
      <div class="input-section">
        <div class="input-button-row">
          <input class="half-width" #editPlaylistValue placeholder="playlist id" />
          <button class="normal-button" (click)="editPlaylist(editPlaylistValue.value)">Edit Playlist</button>
        </div>
        <div class="input-button-row">
          <input class="half-width" #gotoPlaylistValue placeholder="playlist id" />
          <button class="normal-button" (click)="gotoPlaylist(gotoPlaylistValue.value)">Goto Playlist</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './landingpage.component.css',
})
export class LandingpageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  editPlaylist(playlistId: string) {
    this.router.navigateByUrl(`/create/:${playlistId}`);
  }

  gotoPlaylist(playlistId: string) {
    this.router.navigateByUrl(`/playlist/:${playlistId}`);
  }
}
