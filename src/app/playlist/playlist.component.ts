import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../../services/playlist-service';
import { Playlist } from '../models/playlist';
import { SafePipe } from '../safe.pipe';
import { YouTubePlayer } from '@angular/youtube-player';
import { SharedModule } from '../shared.module';
import { StateChanges } from '../models/youtube-models';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [SafePipe, SharedModule],
  template: `
    @if (playlist) {
      <div [style.backgroundImage]="'url(' + playlist.background + ')'" class="container">
        <span class="message" style="white-space: pre-line">{{ playlist.message }}</span>

        @if (playlistStartet && currentSongIndex < songs.length) {
          <div class="current-song">
            <span class="song-number">Sang {{ currentSongIndex + 1 }} af {{ songs.length }}</span>
            <span>{{ currentSongAuthor + ' - ' + currentSongTitle }}</span>
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
    }
  `,
  styles: `
    .container {
      background-repeat: no-repeat;
      background-size: 100% 100%;
      min-height: 100vh;
      padding-top: 20vh;
      box-sizing: border-box;
    }

    span.message {
      display: block;
      font-size: 60px;
      max-width: 50vw;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      color: #D09C66;
      background-color: rgb(0, 0, 0, 0.2);
      border-radius: 16px;
      font-family: dkaurevoir;
    }

    div.current-song {
      margin-top: 20vh;
      font-size: 80px;
      font-weight: bold;
      color: black;
      width: 100%;
      text-align: center;
    }

    div.current-song span {
      display: block;
    }

    button.start-button {
      display: block;
      width: 400px;
      height: 50x;
      font-size: 30px;
      padding: 32px;
      border: none;
      border-radius: 16px;
      color: #D09C66;
      background-color: rgb(0, 0, 0, 0.8);
      margin-top: 20vh;
      margin-left: auto;
      margin-right: auto;
    }

    button.start-button:hover {
      cursor: pointer;
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

  startPlayback() {
    this.currentSongIndex = 0;
    this.player?.playVideo();
    this.playlistStartet = true;
  }

  stopPlayback($event: any) {
    if (this.player) {
      this.player.stopVideo();
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
