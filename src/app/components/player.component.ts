import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PlaylistService } from '../../services/playlist-service';
import { Playlist } from '../models/playlist';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [SharedModule],
  template: `
    @if (!playlistStarted || currentSongIndex > songs.length) {
      <button class="start-button" (click)="startPlayback()">Begynd her</button>
    } @else {
      <div class="current-song">
        <span class="song-number">Sang {{ currentSongIndex + 1 }} af {{ songs.length }}</span>
        <span>{{ currentSongAuthor + ' - ' + currentSongTitle }}</span>

        @if (this.currentSongIndex > 0) {
          <img class="player-button" src="assets/icons/previous.png" alt="previous-button" (click)="playPrevious()"/>
        }
        @if (isPlaying) {
          <img class="player-button" src="assets/icons/pause.png" alt="pause-button" (click)="pausePlayback()"/>
        } @else {
          <img class="player-button" src="assets/icons/play.png" alt="pause-button" (click)="resumePlayback()"/>
        }

        @if (this.currentSongIndex < this.songs.length - 1) {
          <img class="player-button" src="assets/icons/next-button.png" alt="next-button" (click)="playNext()"/>
        }
      </div>
    }

    <youtube-player
      #player
      [videoId]="songs[currentSongIndex]"
      [width]="1"
      [height]="1"
      (stateChange)="onStateChange($event)"
      loadApi="false"
    />
  `,
  styles: `
    div.current-song {
      margin-top: auto;
      font-size: clamp(1.875rem, 1.0938rem + 2.5vw, 5rem);
      font-weight: bold;
      color: black;
      width: 100%;
      text-align: center;
    }

    div.current-song span {
      font-family: quenting;
      display: block;
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

    .player-button {
      width: 16px;
      height: 16px;
      cursor: pointer;
      margin-left: 8px;
      margin-right: 8px;
    }

    @media screen and (max-width: 600px) {

      button.start-button {
        padding: 16px 32px;
      }
    }
  `,
})
export class PlayerComponent implements OnChanges {
  @Input() playlist?: Playlist;

  player?: YT.Player;
  songs: string[] = [];
  currentSongIndex = 0;
  currentSongTitle = '';
  currentSongAuthor = '';
  playlistStarted = false;
  isPlaying = false;
  backgroundLoaded = false;

  ngOnChanges(): void {
    if (this.playlist) {
      this.songs = [
        this.playlist?.song1,
        this.playlist?.song2,
        this.playlist?.song3,
        this.playlist?.song4,
        this.playlist?.song5,
      ];
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
      case YT.PlayerState.UNSTARTED:
        this.currentSongAuthor = ($event.target as any).playerInfo.videoData.author.replace(' - Topic', '');
        this.currentSongTitle = ($event.target as any).playerInfo.videoData.title.replace('(Official Video)', '');
        break;
      case YT.PlayerState.ENDED:
        this.currentSongIndex++;
        break;
      case YT.PlayerState.CUED:
        if (this.currentSongIndex < this.songs.length) {
          this.player = $event.target;
          this.player.playVideo();
        }
        break;
    }
  }
}
