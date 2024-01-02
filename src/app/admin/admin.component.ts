import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Playlist } from '../models/playlist';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../services/playlist-service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form>
      <input [(ngModel)]="model.id" name="id" placeholder="id" />
      <textarea [(ngModel)]="model.message" name="message" placeholder="message"></textarea>
      <input [(ngModel)]="model.background" name="background" placeholder="background" />
      <input [(ngModel)]="model.song1" name="song1" placeholder="song1" />
      <input [(ngModel)]="model.song2" name="song2" placeholder="song2" />
      <input [(ngModel)]="model.song3" name="song3" placeholder="song3" />
      <input [(ngModel)]="model.song4" name="song4" placeholder="song4" />
      <input [(ngModel)]="model.song5" name="song5" placeholder="song5" />
      <button (click)="onSubmit()">Gem</button>
    </form>
  `,
  styles: `
    input {
      display: block;
      margin-bottom: 0.5rem;
    }
  `,
})
export class AdminComponent implements OnInit {
  model: Playlist = Playlist.emptyPlaylist();

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.playlistService.addPlaylist(this.model);
  }
}
