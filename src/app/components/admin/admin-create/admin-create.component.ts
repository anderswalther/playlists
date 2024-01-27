import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Song } from '../../../models/playlist';
import { YoutubeApiService } from '../../../../services/youtubeapi-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AdminPreviewComponent } from '../admin-preview/admin-preview.component';
import { PlaylistService } from '../../../../services/playlist-service';
import { AdminComponent } from '../admin.component';

@Component({
  selector: 'app-admin-create',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  template: `
    <h1>{{ !!playlist.id ? 'Edit your playlist' : 'Create a playlist' }}</h1>
    <div class="container">
      <div class="input-section">
        <form #form="ngForm">
          <textarea
            class="message"
            [(ngModel)]="playlist.message"
            name="message"
            placeholder="message *"
            rows="8"
            required
          ></textarea>

          <input
            class="background-input"
            [(ngModel)]="playlist.background"
            required
            name="background"
            placeholder="background *"
          />

          <select class="song-text-color" [(ngModel)]="playlist.textColor" name="textColor">
            <option value="black">Song info color: dark</option>
            <option value="rgb(215, 154, 164, 0.6)">Song info color: light purple</option>
          </select>

          <div class="add-song-row">
            <input [(ngModel)]="ytIdOfSongToAdd" name="songToAdd" placeholder="Youtube video url or id" />
            <button class="normal-button" (click)="onYtIdChanged()">Add song</button>
          </div>

          @for (song of playlist.songs; track song.ytId) {
            <div class="input-row">
              <input [(ngModel)]="song.artist" name="{{ song.artist }}_id" placeholder="artist *" />
              <input [(ngModel)]="song.title" name="{{ song.title }}_id" placeholder="title *" />
            </div>
          }
        </form>
        <div class="buttons">
          <button class="normal-button preview" [disabled]="!form.valid" (click)="preview()">Preview</button>
          <button class="normal-button submit" [disabled]="!form.valid" (click)="onSubmit()">Publish</button>
        </div>
      </div>
      <div class="howtos">
        <img src="assets/howto_image.png" />
      </div>
    </div>
  `,
  styleUrl: './admin-create.component.css',
})
export class AdminCreateComponent extends AdminComponent {
  ytIdOfSongToAdd = '';

  constructor(
    playlistService: PlaylistService,
    private youtubeApiService: YoutubeApiService,
    private dialog: MatDialog
  ) {
    super(playlistService);
  }

  onYtIdChanged() {
    if (this.ytIdOfSongToAdd.length > 0) {
      this.youtubeApiService.getSong(this.ytIdOfSongToAdd).subscribe((song: Song) => {
        if (song) {
          this.playlist.songs.push(song);
          this.ytIdOfSongToAdd = '';
        }
      });
    }
  }

  onSubmit(): void {
    this.playlistService.addPlaylist(this.playlist).then(() => {
      this.router.navigateByUrl(`share/${this.playlist.id}`);
    });
  }

  preview(): void {
    this.dialog.open(AdminPreviewComponent, {
      width: '90vw',
      height: '90vh',
      data: {
        playlist: this.playlist,
      },
      panelClass: 'custom-mat-dialog-panel',
    });
  }
}
