import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Playlist, Song } from '../../../models/playlist';
import { YoutubeApiService } from '../../../../services/youtubeapi-service';

@Component({
  selector: 'app-admin-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="input-section">
        <form #form="ngForm">
          <textarea
            class="message"
            [(ngModel)]="model.message"
            name="message"
            placeholder="message *"
            rows="8"
            required
          ></textarea>

          <input
            class="background-input"
            [(ngModel)]="model.background"
            required
            name="background"
            placeholder="background *"
          />

          <div class="add-song-row">
            <input [(ngModel)]="ytIdOfSongToAdd" name="songToAdd" placeholder="Youtube video url or id" />
            <button class="normal-button" (click)="onYtIdChanged()">Add song</button>
          </div>

          @for (song of model.songs; track song.ytId) {
            <div class="input-row">
              <input [(ngModel)]="song.ytId" name="{{ song.ytId }}_id" placeholder="youtube id *" />
              <input [(ngModel)]="song.title" name="{{ song.title }}_id" placeholder="title *" />
              <input [(ngModel)]="song.artist" name="{{ song.artist }}_id" placeholder="youtube id *" />
            </div>
          }
        </form>
        <button class="normal-button submit" [disabled]="!form.valid" (click)="onSubmit()">Save</button>
      </div>
      <div class="howtos">
        <img src="assets/howto_image.png" />
      </div>
    </div>
  `,
  styleUrl: './admin-create.component.css',
})
export class AdminCreateComponent {
  @Input() model!: Playlist;
  @Output() modelChange = new EventEmitter<Playlist>();

  ytIdOfSongToAdd = '';

  constructor(private youtubeApiService: YoutubeApiService) {}

  onYtIdChanged() {
    if (this.ytIdOfSongToAdd.length > 0) {
      this.youtubeApiService.getSong(this.ytIdOfSongToAdd).subscribe((song: Song) => {
        if (song) {
          this.model.songs.push(song);
          this.ytIdOfSongToAdd = '';
        }
      });
    }
  }

  onSubmit(): void {
    this.modelChange.emit(this.model);
  }
}
