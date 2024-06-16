import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../../../services/playlist-service';

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
          <button class="normal-button" (click)="gotoPlaylist(editPlaylistValue.value)">Goto Playlist</button>
        </div>

        <div class="existing-playlists">
          @for (playlist of playlistService.playlists$(); track playlist.id) {
            <div class="input-button-row">
              <span class="message">{{ playlist.message }}</span>
              <button class="normal-button" (click)="editPlaylist(playlist.id!)">Edit Playlist</button>
              <button class="normal-button" (click)="gotoPlaylist(playlist.id!)">Goto Playlist</button>
            </div>
          } @empty {
            Empty list of playlists
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './landingpage.component.css',
})
export class LandingpageComponent implements OnInit {
  playlistService = inject(PlaylistService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.playlistService.loadAllPlaylists();
  }

  editPlaylist(playlistId: string) {
    this.router.navigateByUrl(`/edit/${playlistId}`);
  }

  gotoPlaylist(playlistId: string) {
    this.router.navigateByUrl(`/playlist?id=${playlistId}`);
  }
}
