import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Playlist } from '../models/playlist';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../services/playlist-service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      @if (creatingPlalist) {
        <form>
          <input readonly [ngModel]="model.id" name="id" placeholder="id" />
          <textarea [(ngModel)]="model.message" name="message" placeholder="message"></textarea>
          <input [(ngModel)]="model.background" name="background" placeholder="background" />
          <input [(ngModel)]="model.song1" name="song1" placeholder="song1" />
          <input [(ngModel)]="model.song2" name="song2" placeholder="song2" />
          <input [(ngModel)]="model.song3" name="song3" placeholder="song3" />
          <input [(ngModel)]="model.song4" name="song4" placeholder="song4" />
          <input [(ngModel)]="model.song5" name="song5" placeholder="song5" />
          <button (click)="onSubmit()">Gem</button>
        </form>
      } @else if (sharingPlaylist) {
        <p>Del din playliste med en du holder af:</p>
        <input type="text" [(ngModel)]="yourName" name="yourName" placeholder="Dit navn" />
        <input type="email" [(ngModel)]="emailRecipient" name="Recipient" placeholder="Modtagerens email" />
        <button (click)="onSubmitEmail()">Del playlisten</button>
      } @else {
        All is done
      }
    </div>
  `,
  styles: `
    .container {
      margin-top: 60px;
      width: 80vw;
      margin-left: auto;
      margin-right: auto;
      background-color: #f1f1f1;
      padding: 40px 20px;
      border-radius: 4px;
      box-shadow: inset 0 1px 3px #ddd;
    }

    textarea,
    input {
      width: 100%;
      display: block;
      margin-bottom: 0.5rem;
      padding: 12px 16px;
      border-radius: 4px;
      border: none;
      box-shadow: inset 0 1px 3px #ddd;
      box-sizing: border-box;
    }
  `,
})
export class AdminComponent implements OnInit {
  model: Playlist = Playlist.emptyPlaylist(this.randomString(8));
  emailRecipient = '';
  yourName = '';

  creatingPlalist = true;
  sharingPlaylist = false;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.playlistService.addPlaylist(this.model).then(() => {
      this.creatingPlalist = false;
      this.sharingPlaylist = true;
    });
  }

  onSubmitEmail(): void {
    const templateParams = {
      from_name: this.yourName,
      to_email: this.emailRecipient,
      message: `Jeg har lavet en playliste til dig. Check den ud her: share-playlists.com?id=${this.model.id}`,
    };

    emailjs.send('service_0ue6app', 'template_5g76d67', templateParams, '_Nn64Tbb0vHbotSkk').then(
      (response) => {
        this.sharingPlaylist = false;
        console.log('SUCCESS!', response.status, response.text);
      },
      (err) => {
        console.log('FAILED...', err);
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
}
