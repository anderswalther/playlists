import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Playlist } from '../models/playlist';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../services/playlist-service';
import emailjs from '@emailjs/browser';
import { PrinterComponent } from './printer.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, PrinterComponent],
  template: `
    @if (creatingPlalist) {
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
      </div>
    } @else if (sharingPlaylist) {
      <h1>Your playlist is ready!</h1>
      <a [href]="'share-playlists.com/playlist?id=' + model.id">share-playlists.com/playlist?id={{ model.id }}</a>
      <div class="container">
        <div class="input-section share-playlist">
          <h2>Share</h2>
          <p class="sub-title">Share your playlist with someone you care about:</p>
          <input type="text" [(ngModel)]="yourName" name="yourName" placeholder="Your name *" />
          <input type="email" [(ngModel)]="emailRecipient" name="Recipient" placeholder="Receivers email *" />
          <button (click)="onSubmitEmail()">Send</button>
        </div>
        <div class="or-section">
          <span>OR</span>
        </div>
        <div class="input-section print-playlist">
          <h2>Print</h2>
          <p class="sub-title">
            Print your playlist and give it is a gift to someone you care about. The printet playlist will contain your
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
  styles: `
    :host {
      padding-top: 50px;
      display: block;
      text-align: center;
      background-color: black;
      min-height: 100svh;
      height: 100%;
      padding-bottom: 16px;
      box-sizing: border-box;
    }

    h1, h2, .or-section {
      margin-top: 0;
      color: #D53349;
      font-weight: bold;
    }

    h1 {
      font-size: 50px;
    }

    h2, .or-section {
      font-size: 32px;
    }

    a {
      color: #e56b20;
      text-decoration: none;
      font-weight: bold;
      font-size: 18px;
    }

    p.sub-title, p.help {
      color: #e56b20;
      text-align: left;
    }

    .create-container,
    .container {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 50px;
      margin-top: 60px;
      width: 80vw;
      height: 400px;
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
      background-color: #f1f1f1;
      padding: 40px 20px;
      border-radius: 4px;
      box-shadow: inset 0 1px 3px #ddd;
    }
    .create-container {
      height: 650px;
    }

    .or-section {
      align-self: center;
    }

    form {
      width: 100%;
    }

    .input-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #2F232A;
      padding: 16px;
      border-radius: 4px;
      height: 100%;
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
      font-weight: bold;
      cursor: pointer;
    }

    app-printer, button {
      margin-top: auto;
    }


    @media screen and (max-width: 800px) {
      .create-container,
      .container {
        flex-direction: column;
        gap: 16px;
        height: auto;
        align-items: center;
      }

      .input-section {
        width: 100%;
        box-sizing: border-box;
      }

      .input-section button, .input-section app-printer {
        margin-top: 32px;
      }
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
