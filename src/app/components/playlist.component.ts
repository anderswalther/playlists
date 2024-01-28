import { Component, Input, ViewChild } from '@angular/core';
import { PlaylistService } from '../../services/playlist-service';
import { Playlist } from '../models/playlist';
import { SafePipe } from '../shared/pipes/safe.pipe';
import { SharedModule } from '../shared/shared.module';
import { LoadscreenComponent } from './loadscreen.component';
import { PlayerComponent } from './player.component';
import { PrinterComponent } from './printer.component';
import { PreloaderComponent } from './preloader/preloader.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [SafePipe, SharedModule, LoadscreenComponent, PlayerComponent, PrinterComponent, PreloaderComponent],
  template: `
    @if (playlist) {
      @if (backgroundLoaded) {
        <div [style.backgroundImage]="'url(' + playlist.background + ')'" class="container">
          <span class="message" style="white-space: pre-line">{{ playlist.message }}</span>
          @if (playlist && !!playlist.id) {
            <app-player [playlist]="playlist"></app-player>
          }
          <app-printer #printer [playlist]="playlist"></app-printer>
          <img class="normal-icon" src="assets/icons/printer.png" alt="print button" (click)="print()" />
        </div>
      } @else {
        <app-loadscreen></app-loadscreen>
        <app-preloader
          [backgroundImageUrl]="playlist.background"
          (allImagesLoaded)="onImagesDoneLoading()"
        ></app-preloader>
      }
    }
  `,
  styleUrl: './playlist.component.css',
})
export class PlaylistComponent {
  @ViewChild('printer') printer?: PrinterComponent;
  @Input()
  set id(id: string) {
    this.loadPlaylist(id);
  }

  @Input()
  set previewPlaylist(preview: Playlist) {
    this.playlist = preview;
  }

  playlist?: Playlist = Playlist.emptyPlaylist();
  backgroundLoaded = false;
  constructor(private playlistService: PlaylistService) {}

  async loadPlaylist(id: string) {
    this.playlist = await this.playlistService.getPlaylist(id);
  }

  onImagesDoneLoading() {
    this.backgroundLoaded = true;
  }

  print() {
    if (this.printer) {
      this.printer.print();
    }
  }
}
