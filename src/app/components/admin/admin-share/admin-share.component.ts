import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PrinterComponent } from '../../printer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Playlist } from '../../../models/playlist';
import { CommonModule } from '@angular/common';
import { EmailContent } from '../../../models/email-content';
import emailjs from '@emailjs/browser';
import { PlaylistService } from '../../../../services/playlist-service';
import { FeedbackService } from '../../../../services/feedback-service';
import { AdminComponent } from '../admin.component';
import { EmailService } from '../../../../services/email-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-share',
  standalone: true,
  imports: [PrinterComponent, ReactiveFormsModule, CommonModule, FormsModule],
  template: `
    <h1>Your playlist is ready!</h1>
    <a [href]="'https://share-playlists.com/playlist?id=' + playlist.id">
      www.share-playlists.com/playlist?id={{ playlist.id }}
    </a>
    <div class="container">
      <div class="inner-container">
        <div class="input-section share-playlist">
          <h2>Share</h2>
          <p class="sub-title">Share your playlist with someone you care about:</p>
          <form>
            <input
              type="email"
              [(ngModel)]="emailContent.receiverEmail"
              name="Recipient"
              placeholder="Receivers email *"
            />
            <textarea [(ngModel)]="emailContent.message" name="emailMessage" placeholder="email"></textarea>
            <br />
            <span>Some information about you:</span>
            <input type="text" [(ngModel)]="emailContent.senderName" name="yourName" placeholder="Your name *" />
            <input type="text" [(ngModel)]="emailContent.senderEmail" name="yourEmail" placeholder="Your email " />
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
          <app-printer #printer [playlist]="playlist"></app-printer>
          <button class="normal-button print-button" (click)="print()">Print</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './admin-share.component.css',
})
export class AdminShareComponent extends AdminComponent {
  @ViewChild('printer') printer?: PrinterComponent;

  emailContent = EmailContent.emptyEmailContent();

  constructor(
    playlistService: PlaylistService,
    private emailService: EmailService,
    router: Router,
    toastr: ToastrService
  ) {
    super(playlistService, router, toastr);
  }

  onSubmitEmail(): void {
    this.emailService.sendEmail(this.emailContent, this.playlist.id);
  }

  print() {
    if (this.printer) {
      this.printer.print();
    }
  }
}
