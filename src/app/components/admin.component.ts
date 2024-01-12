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
    <h1>Create a playlist</h1>
    <div class="container">
      @if (creatingPlalist) {
        <div class="input-fields">
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
              class="backgorund-input"
              [(ngModel)]="model.background"
              required
              name="background"
              placeholder="background *"
            />
            <input [(ngModel)]="model.song1" required name="song1" placeholder="song1 *" />
            <input [(ngModel)]="model.song2" required name="song2" placeholder="song2 *" />
            <input [(ngModel)]="model.song3" required name="song3" placeholder="song3 *" />
            <input [(ngModel)]="model.song4" required name="song4" placeholder="song4 *" />
            <input [(ngModel)]="model.song5" required name="song5" placeholder="song5 *" />
          </form>
          <button [disabled]="!form.valid" (click)="onSubmit()">Save</button>
        </div>
        <div class="howtos">
          <img src="assets/howto_image.png" />
          <img src="assets/howto_songid.png" />
        </div>
      } @else if (sharingPlaylist) {
        <div class="input-fields shareing-playlist">
          <p>
            Your playlist is ready at
            <i>
              <b>share-playlists.com/playlist?id={{ model.id }}</b>
            </i>
          </p>
          <p>Share your playlist with someone you care about:</p>
          <input type="text" [(ngModel)]="yourName" name="yourName" placeholder="Your name *" />
          <input type="email" [(ngModel)]="emailRecipient" name="Recipient" placeholder="Receivers email *" />
          <button (click)="onSubmitEmail()">Send</button>
        </div>
      } @else {
        <p>It's away! Enjoy :) </p>
      }
    </div>
  `,
  styles: `
    :host {
      padding-top: 50px;
      display: block;
      text-align: center;
      background-color: black;
      height: 100svh;
    }

    h1 {
      margin-top: 0;
      font-size: 50px;
      color: #D53349;
      font-weight: bold;
    }

    .container {
      display: flex;
      justify-content: center;
      gap: 50px;
      margin-top: 60px;
      width: 80vw;
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
      background-color: #f1f1f1;
      padding: 40px 20px;
      border-radius: 4px;
      box-shadow: inset 0 1px 3px #ddd;
    }

    .input-fields {
      flex: 1;
      background-color: #2F232A;
      padding: 16px;
      border-radius: 4px;
    }

    .shareing-playlist {
      color: #D53349;
    }

    img {
      display: block;
      width: 300px;
      margin-bottom: 36px;
      border-radius: 4px;
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

    .backgorund-input,
    .message {
      margin-bottom: 50px;
    }

    button {
      width: 200px;
      padding: 8px 32px;
      border: none;
      background-color: #D53349;
      border-radius: 4px;
      margin-top: 50px;
      cursor: pointer;
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
      message: `I made a playlist for you. Check it out here: share-playlists.com/playlist?id=${this.model.id}`,
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
