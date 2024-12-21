import { AfterViewInit, Component, Input, OnChanges, QueryList, viewChildren, ViewChildren } from '@angular/core';
import { Playlist, Song } from '../shared/models/playlist';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [SharedModule, CommonModule],
  template: `
    <div style="color: white">state is : {{ state }}</div>
    <div style="color: white">state2 is : {{ state2 }}</div>
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

    @for (song of songs; track song; let index = $index) {
      <youtube-player
        #player
        [videoId]="songs[index].ytId"
        [width]="200"
        [height]="200"
        [startSeconds]="20"
        (stateChange)="onStateChange($event, index)"
        (ready)="onPlayerReady($event)"
      />
    }
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
      color: #d09c66;
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
export class PlayerComponent implements OnChanges, AfterViewInit {
  @ViewChildren('player') players?: QueryList<YouTubePlayer>;

  ngAfterViewInit() {
    // print array of CustomComponent objects
    if (this.players) {
      console.log(this.players.toArray());
    }
  }

  @Input() playlist?: Playlist;

  state = 'no state';
  state2 = 'no state';
  stateVersion = 0;
  player?: YT.Player;
  songs: Song[] = [];
  currentPlayerIndex = 0;
  currentSongIndex = 0;
  playlistStarted = false;
  isPlaying = false;
  backgroundLoaded = false;

  playerConfig = {
    autoplay: 0,
  };

  ngOnChanges(): void {
    if (this.playlist) {
      this.songs = this.playlist.songs;
    }
    if (this.players) {
      console.log('in changes, ' + this.players.toArray());
    }
  }

  startPlayback() {
    this.currentPlayerIndex = 0;
    this.players?.toArray().forEach((player, index) => {
      player.playVideo();
      if (index > 0) {
        setTimeout(() => {
          player.pauseVideo();
        }, 500);
      }
    });
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
    let currentPlayer = this.players?.get(this.currentPlayerIndex);
    if (currentPlayer) {
      currentPlayer.pauseVideo();
    }
    this.currentPlayerIndex++;
    currentPlayer = this.players?.get(this.currentPlayerIndex);
    if (currentPlayer) {
      currentPlayer.playVideo();
    }
  }

  pausePlayback() {
    if (this.player) {
      this.player.pauseVideo();
      this.isPlaying = false;
    }
  }

  onStateChange($event: YT.OnStateChangeEvent, index: number) {
    switch ($event.data) {
      case YT.PlayerState.UNSTARTED:
        this.state2 = 'song not started';
        console.log('UNSTARTET');
        break;
      case YT.PlayerState.PLAYING:
        this.state2 = 'song playing';
        console.log('PLAYING');
        break;
      case YT.PlayerState.ENDED:
        this.currentPlayerIndex++;
        this.players?.get(this.currentPlayerIndex)?.playVideo();
        break;
      case YT.PlayerState.BUFFERING:
        this.state2 = 'song buffering';
        console.log('BUFFERING');
        break;
      case YT.PlayerState.PAUSED:
        this.state2 = 'song paused';
        console.log('PAUSED');
        break;
      case YT.PlayerState.CUED:
        //if (this.players && this.players.length >= index) {
        //  if (index === 0 && this.playlistStarted) {
        //    this.players.get(0)?.playVideo();
        //  } else {
        //    this.players.get(index)?.pauseVideo();
        //  }
        //}
        break;
    }
  }

  onPlayerReady($event: YT.PlayerEvent) {
    this.stateVersion++;
    this.state = 'REAdy player ready ' + this.stateVersion;
    this.player = $event.target;
  }
}
