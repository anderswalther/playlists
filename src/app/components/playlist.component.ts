import { Component, Input, ViewChild } from '@angular/core';
import { PlaylistService } from '../../services/playlist-service';
import { Playlist } from '../models/playlist';
import { SafePipe } from '../shared/pipes/safe.pipe';
import { SharedModule } from '../shared/shared.module';
import { LoadscreenComponent } from './loadscreen.component';
import { PlayerComponent } from './player.component';
import { PrinterComponent } from './printer.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [SafePipe, SharedModule, LoadscreenComponent, PlayerComponent, PrinterComponent],
  template: `
    @if (playlist) {
      @if (backgroundLoaded) {
        <div [style.backgroundImage]="'url(' + playlist.background + ')'" class="container">
          <span class="message" style="white-space: pre-line">{{ playlist.message }}</span>
          @if (playlist) {
            <app-player [playlist]="playlist"></app-player>
          }
          <app-printer #printer [playlist]="playlist"></app-printer>
          <img class="print-button" src="assets/icons/printer.png" alt="print button" (click)="print()" />
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
      background-attachment: fixed;
      background-size: cover;
      height: 100svh;
      max-height: 100svh;
      padding-top: 15vh;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }

    span.message {
      display: block;
      font-size: clamp(1.75rem, 0.4688rem + 2.45vw, 3.375rem);
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

    app-player {
      display: block;
      margin-top: auto;
    }

    app-printer {
      position: absolute;
      bottom: 16px;
      right: 16px;
    }

    img.print-button {
      width: 16px;
      height: 16px;
      position: absolute;
      bottom: 1rem;
      right: 1rem;
    }

    img.print-button:hover {
      cursor: pointer;
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
export class PlaylistComponent {
  @ViewChild('printer') printer?: PrinterComponent;
  @Input()
  set id(id: string) {
    this.loadPlaylist(id);
  }

  playlist?: Playlist = Playlist.emptyPlaylist();
  backgroundLoaded = false;
  constructor(private playlistService: PlaylistService) {}

  async loadPlaylist(id: string) {
    this.playlist = await this.playlistService.getPlaylist(id);
  }

  onBackgroundLoaded() {
    this.backgroundLoaded = true;
  }

  print() {
    if (this.printer) {
      this.printer.print();
    }
  }
}
