import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Playlist, Song } from '../models/playlist';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../services/playlist-service';
import emailjs from '@emailjs/browser';
import { PrinterComponent } from './printer.component';
import { ToastrService } from 'ngx-toastr';
import { YoutubeApiService } from '../../services/youtubeapi-service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, PrinterComponent],
  styleUrls: ['./admin.component.css'],
  template: `
    @if (creatingPlaylist) {
      <h1>Create a playlist</h1>
      <div class="create-container">
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
              <input [(ngModel)]="ytIdOfSongToAdd" name="songToAdd" placeholder="add song id" />
              <button (click)="onYtIdChanged()">Add song</button>
            </div>

            @for (song of model.songs; track song.ytId) {
              <div class="input-row">
                <input [(ngModel)]="song.ytId" name="{{ song.ytId }}_id" placeholder="youtube id *" />
                <input [(ngModel)]="song.title" name="{{ song.title }}_id" placeholder="title *" />
                <input [(ngModel)]="song.artist" name="{{ song.artist }}_id" placeholder="youtube id *" />
              </div>
            }
          </form>
          <button class="submit" [disabled]="!form.valid" (click)="onSubmit()">Save</button>
        </div>
        <div class="howtos">
          <img src="assets/howto_image.png" />
          <img src="assets/howto_songid.png" />
        </div>
      </div>
    } @else if (sharingPlaylist) {
      <h1>Your playlist is ready!</h1>
      <a [href]="'https://share-playlists.com/playlist?id=' + model.id">
        share-playlists.com/playlist?id={{ model.id }}
      </a>
      <div class="container">
        <div class="input-section share-playlist">
          <h2>Share</h2>
          <p class="sub-title">Share your playlist with someone you care about:</p>
          <input type="text" [(ngModel)]="yourName" name="yourName" placeholder="Your name *" />
          <input type="email" [(ngModel)]="emailRecipient" name="Recipient" placeholder="Receivers email *" />
          <textarea [(ngModel)]="yourEmailMessage" name="emailMessage" placeholder="email"></textarea>
          <button (click)="onSubmitEmail()">Send</button>
        </div>
        <div class="or-section">
          <span>OR</span>
        </div>
        <div class="input-section print-playlist">
          <h2>Print</h2>
          <p class="sub-title">
            Print your playlist and give it is a gift to someone you care about. The printed playlist will contain your
            background-image, your message and a QR-code which will link to your playlist.
          </p>
          <p class="help">(Remember to check the print-option to include background images)</p>
          <app-printer [playlist]="model"></app-printer>
        </div>
      </div>
    } @else {
      <p>It's away! Enjoy :)</p>
    }
  `,
})
export class AdminComponent implements OnInit {
  model: Playlist = Playlist.emptyPlaylist(this.randomString(8));
  emailRecipient = '';
  yourName = '';
  yourEmailMessage = '';
  ytIdOfSongToAdd = '';

  creatingPlaylist = true;
  sharingPlaylist = false;

  constructor(
    private playlistService: PlaylistService,
    private youtubeApiService: YoutubeApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.playlistService.addPlaylist(this.model).then(() => {
      this.creatingPlaylist = false;
      this.sharingPlaylist = true;
    });
  }

  onSubmitEmail(): void {
    const templateParams = {
      from_name: this.yourName,
      to_email: this.emailRecipient,
      message: this.yourEmailMessage,
      link_to_playlist: `share-playlists.com/playlist?id=${this.model.id}`,
    };

    emailjs.send('service_0ue6app', 'template_5g76d67', templateParams, '_Nn64Tbb0vHbotSkk').then(
      (response) => {
        this.toastr.success('Mail has been send!');
      },
      (err) => {
        this.toastr.warning('Something went wrong');
      }
    );
  }

  randomString(length: number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

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
}
