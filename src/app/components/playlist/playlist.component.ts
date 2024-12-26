import { Component, Input, ViewChild } from '@angular/core';
import { PlaylistService } from '../../../services/playlist-service';
import {Playlist} from '../../shared/models/playlist';
import { SharedModule } from '../../shared/shared.module';
import { LoadscreenComponent } from '../loadscreen.component';
import { PlayerComponent } from '../../shared/components/player/player.component';
import { PrinterComponent } from '../printer.component';
import { PreloaderComponent } from '../preloader/preloader.component';
import {NgClass} from "@angular/common";
import { VintageFilter } from '../../shared/models/vintage-filters';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [SharedModule, LoadscreenComponent, PlayerComponent, PrinterComponent, PreloaderComponent, NgClass],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
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

  protected readonly VintageFilter = VintageFilter;
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
