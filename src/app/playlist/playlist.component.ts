import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../../services/playlist-service';
import { Playlist } from '../models/playlist';
import { SafePipe } from '../safe.pipe';
import { YouTubePlayer } from '@angular/youtube-player';
import { SharedModule } from '../shared.module';
import { StateChanges } from '../models/youtube-models';
import { LoadscreenComponent } from '../loadscreen/loadscreen.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [SafePipe, SharedModule, LoadscreenComponent],
  template: `
    @if (playlist) {
      @if (backgroundLoaded) {
        <div [style.backgroundImage]="'url(' + playlist.background + ')'" class="container">
          <span class="message" style="white-space: pre-line">{{ playlist.message }}</span>

          @if (playlistStartet && currentSongIndex < songs.length) {
            <div class="current-song">
              <span class="song-number">Sang {{ currentSongIndex + 1 }} af {{ songs.length }}</span>
              <span>{{ currentSongAuthor + ' - ' + currentSongTitle }}</span>

              @if (this.currentSongIndex > 0) {
                <img
                  class="player-button"
                  src="assets/icons/previous.png"
                  alt="previous-button"
                  (click)="playPrevious()"
                />
              }
              @if (isPlaying) {
                <img class="player-button" src="assets/icons/pause.png" alt="pause-button" (click)="pausePlayback()" />
              } @else {
                <img class="player-button" src="assets/icons/play.png" alt="pause-button" (click)="startPlayback()" />
              }

              @if (this.currentSongIndex < this.songs.length - 1) {
                <img class="player-button" src="assets/icons/next-button.png" alt="next-button" (click)="playNext()" />
              }
            </div>
          } @else {
            <button class="start-button" (click)="startPlayback()">Begynd her</button>
          }

          @if (playlist) {
            <youtube-player
              #player
              [videoId]="songs[currentSongIndex]"
              [width]="1"
              [height]="1"
              (stateChange)="onStateChange($event)"
              (error)="onError($event)"
              (apiChange)="onApiChange($event)"
              loadApi="false"
            />
          }
        </div>
      } @else {
        <img class="preloading-image" [src]="playlist.background" (load)="onBackgroundLoaded()" />
        <app-loadscreen></app-loadscreen>
      }
    }
  `,
  styles: `
    .preloading-image {
      width: 1px;
      height: 1px;
      margin-left: -10000px;
    }

    .container {
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 100svh;
      max-height: 100svh;
      padding-top: 15vh;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }

    span.message {
      display: block;
      font-size: clamp(1.5rem, 0.4688rem + 2.2vw, 3.125rem);
      width: clamp(45vw, 60vw, 70vw);
      margin-left: auto;
      margin-right: auto;
      padding: 16px;
      text-align: center;
      color: #D09C66;
      background-color: rgb(0, 0, 0, 0.3);
      border-radius: 16px;
      font-family: dkaurevoir;
    }

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
      span.message {
        width: 90%;
        box-sizing: border-box;
      }

      button.start-button {
        padding: 16px 32px;
      }
    }
  `,
})
export class PlaylistComponent implements OnInit {
  @Input()
  set id(id: string) {
    this.loadPlaylist(id);
  }

  player?: YT.Player;
  playlist?: Playlist = Playlist.emptyPlaylist();
  songs: string[] = [];
  currentSongIndex = 0;
  currentSongTitle = '';
  currentSongAuthor = '';
  playlistStartet = false;
  isPlaying = false;
  backgroundLoaded = false;
  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {}

  async loadPlaylist(id: string) {
    this.playlist = await this.playlistService.getPlaylist(id);
    if (this.playlist) {
      this.songs = [
        this.playlist.song1,
        this.playlist.song2,
        this.playlist.song3,
        this.playlist.song4,
        this.playlist.song5,
      ];
    }
  }

  onBackgroundLoaded() {
    this.backgroundLoaded = true;
  }

  startPlayback() {
    this.currentSongIndex = 0;
    this.player?.playVideo();
    this.playlistStartet = true;
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

  onError($event: any) {
    console.log($event);
  }

  onApiChange($event: any) {
    console.log('in api ready');
    console.log($event);
  }
}
