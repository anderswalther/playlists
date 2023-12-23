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
    <!--
<iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/tbyCUdzR87Y?si=9r004uiI6dP18u3S&autoplay=1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ></iframe>
-->

    <form>
      <input [(ngModel)]="model.id" name="id" placeholder="id" />
      <input [(ngModel)]="model.title" name="title" placeholder="title" />
      <input [(ngModel)]="model.message" name="message" placeholder="message" />
      <input
        [(ngModel)]="model.background"
        name="background"
        placeholder="background"
      />
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
