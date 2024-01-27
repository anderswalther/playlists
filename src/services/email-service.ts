import { Injectable } from '@angular/core';
import { FeedbackService } from './feedback-service';
import emailjs from '@emailjs/browser';
import { EmailContent } from '../app/models/email-content';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private feedbackService: FeedbackService) {}

  sendEmail(emailContent: EmailContent, playlistId: string): void {
    const templateParams = {
      from_name: emailContent.senderName,
      from_email: emailContent.senderEmail,
      to_email: emailContent.receiverEmail,
      message: emailContent.message,
      link_to_playlist: `www.share-playlists.com/playlist?id=${playlistId}`,
    };

    emailjs.send('service_0ue6app', 'template_5g76d67', templateParams, '_Nn64Tbb0vHbotSkk').then(
      (response) => {
        this.feedbackService.showSuccess('Email has been send');
      },
      (err) => {
        this.feedbackService.showSuccess('Email could not be send');
      }
    );
  }
}
