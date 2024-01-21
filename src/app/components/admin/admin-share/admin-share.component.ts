import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PrinterComponent } from '../../printer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Playlist } from '../../../models/playlist';
import { CommonModule } from '@angular/common';
import { EmailContent } from '../../../models/email-content';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-admin-share',
  standalone: true,
  imports: [PrinterComponent, ReactiveFormsModule, CommonModule, FormsModule],
  template: `
    <div class="container">
      <a [href]="'https://share-playlists.com/playlist?id=' + model.id">
        www.share-playlists.com/playlist?id={{ model.id }}
      </a>
      <div class="inner-container">
        <div class="input-section share-playlist">
          <h2>Share</h2>
          <p class="sub-title">Share your playlist with someone you care about:</p>
          <form>
            <input type="text" [(ngModel)]="yourName" name="yourName" placeholder="Your name *" />
            <input type="email" [(ngModel)]="emailRecipient" name="Recipient" placeholder="Receivers email *" />
            <textarea [(ngModel)]="yourEmailMessage" name="emailMessage" placeholder="email"></textarea>
          </form>
          <button class="normal-button send-email" (click)="onSubmitEmail()">Send</button>
        </div>
        <div class="or-section">
          <span class="header">OR</span>
        </div>
        <div class="input-section print-playlist">
          <h2>Print</h2>
          <p class="sub-title">
            Print your playlist and give it is a gift to someone you care about. The printed playlist will contain your
            background-image, your message and a QR-code which will link to your playlist.
          </p>
          <p class="help">(Remember to check the print-option to include background images)</p>
          <app-printer #printer [playlist]="model"></app-printer>
          <button class="normal-button print-button" (click)="print()">Print</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './admin-share.component.css',
})
export class AdminShareComponent {
  @ViewChild('printer') printer?: PrinterComponent;
  @Input() model!: Playlist;
  @Output() mailHasBeenSend = new EventEmitter();
  @Output() mailCouldNotBeSend = new EventEmitter();

  emailRecipient = '';
  yourName = '';
  yourEmailMessage = '';

  onSubmitEmail(): void {
    const templateParams = {
      from_name: this.yourName,
      to_email: this.emailRecipient,
      message: this.yourEmailMessage,
      link_to_playlist: `share-playlists.com/playlist?id=${this.model.id}`,
    };

    emailjs.send('service_0ue6app', 'template_5g76d67', templateParams, '_Nn64Tbb0vHbotSkk').then(
      (response) => {
        this.mailHasBeenSend.emit();
      },
      (err) => {
        this.mailCouldNotBeSend.emit();
      }
    );
  }

  print() {
    if (this.printer) {
      this.printer.print();
    }
  }
}
