import { Component, Input, OnChanges } from '@angular/core';
import { Playlist, Song } from '../models/playlist';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [SharedModule, CommonModule],
  template: `
    @if (!playlistStarted || currentSongIndex >= songs.length) {
      <button class="start-button" (click)="startPlayback()">Begynd her</button>
    } @else {
      <div class="current-song" [style.color]="playlist?.textColor || 'black'">
        <span class="song-number">Sang {{ currentSongIndex + 1 }} af {{ songs.length }}</span>
        <span>{{ songs[currentSongIndex].artist + ' - ' + songs[currentSongIndex].title }}</span>

        <img
          class="normal-icon"
          src="assets/icons/backward.png"
          alt="previous-button"
          [ngClass]="this.currentSongIndex <= 0 ? 'disabled' : ''"
          (click)="playPrevious()"
        />
        @if (isPlaying) {
          <img class="normal-icon" src="assets/icons/pause.png" alt="pause-button" (click)="pausePlayback()" />
        } @else {
          <img class="normal-icon" src="assets/icons/play.png" alt="pause-button" (click)="resumePlayback()" />
        }

        <img
          class="normal-icon"
          [ngClass]="this.currentSongIndex >= this.songs.length - 1 ? 'disabled' : ''"
          src="assets/icons/forward.png"
          alt="next-button"
          (click)="playNext()"
        />
      </div>
    }

    <youtube-player
      #player
      [videoId]="songs[currentSongIndex].ytId"
      [width]="1"
      [height]="1"
      (stateChange)="onStateChange($event)"
      loadApi="false"
    />
  `,
  styles: `
    div.current-song {
      margin-top: auto;
      font-size: clamp(1.5rem, 1.0938rem + 2.5vw, 4rem);
      font-weight: bold;
      color: black;
      width: 100%;
      text-align: center;
    }

    div.current-song span {
      font-family: quenting;
      display: block;
    }

    div.current-song span:last-child {
      margin-bottom: 2rem;
    }

    button.start-button {
      display: block;
      width: fit-content;
      min-width: 30vw;
      height: 50x;
      font-size: clamp(1rem, 0.7813rem + 0.7vw, 1.875rem);
      padding: 32px;
      border: none;
      border-radius: 16px;
      color: #D09C66;
      background-color: rgb(0, 0, 0, 0.8);
      margin-top: auto;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 10vh;
    }

    button.start-button:hover {
      cursor: pointer;
    }

    .normal-icon {
      margin-left: 1.5rem;
      margin-right: 1.5rem;
    }

    .player-button.disabled {
      opacity: 0.6;
    }

    .player-button.disabled:hover {
      cursor: default;
    }

    @media screen and (max-width: 768px) {
      .normal-icon {
        margin-left: 1rem;
        margin-right: 1rem;
      }

      button.start-button {
        padding: 16px 32px;
      }
    }
  `,
})
export class PlayerComponent implements OnChanges {
  @Input() playlist?: Playlist;

  player?: YT.Player;
  songs: Song[] = [];
  currentSongIndex = 0;
  playlistStarted = false;
  isPlaying = false;
  backgroundLoaded = false;

  ngOnChanges(): void {
    if (this.playlist) {
      this.songs = this.playlist.songs;
    }
  }

  startPlayback() {
    this.currentSongIndex = 0;
    this.player?.playVideo();
    this.playlistStarted = true;
    this.isPlaying = true;
  }

  resumePlayback() {
    this.player?.playVideo();
    this.isPlaying = true;
  }

  playPrevious() {
    this.currentSongIndex--;
  }

  playNext() {
    this.currentSongIndex++;
  }

  pausePlayback() {
    if (this.player) {
      this.player.pauseVideo();
      this.isPlaying = false;
    }
  }

  onStateChange($event: YT.OnStateChangeEvent) {
    switch ($event.data) {
      case YT.PlayerState.ENDED:
        this.currentSongIndex++;
        break;
      case YT.PlayerState.CUED:
        if (this.currentSongIndex < this.songs.length) {
          this.player = $event.target;
          if (this.playlistStarted) {
            this.player.playVideo();
          }
        }
        break;
    }
  }
}
