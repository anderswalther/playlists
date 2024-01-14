import { Component, Input } from '@angular/core';
import { Playlist } from '../models/playlist';
import { NgxPrintModule } from 'ngx-print';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-printer',
  standalone: true,
  imports: [NgxPrintModule, QRCodeModule],
  template: `
    <div id="print-section" class="container">
      <div class="playlist-content" [style.backgroundImage]="'url(' + playlist.background + ')'">
        <div class="message" style="white-space: pre-line">{{ playlist.message }}</div>
        <div class="qr-section">
          <qrcode
            class="qrcode"
            [qrdata]="'share-playlists.com/playlist?id=' + playlist.id"
            [errorCorrectionLevel]="'M'"
            [colorLight]="'#e3e3df'"
          ></qrcode>
        </div>
        <div class="link">share-playlists.com/playlist?id={{ playlist.id }}</div>
      </div>
    </div>

    <button styleSheetFile="assets/print-styling.css" printTitle="_" printSectionId="print-section" ngxPrint>
      Print
    </button>
  `,
  styles: `
    .container {
      display: none;
    }

    button {
      width: 200px;
      padding: 8px 32px;
      border: none;
      background-color: #D53349;
      border-radius: 4px;
      margin-top: auto;
      font-weight: bold;
      cursor: pointer;
    }

  `,
})
export class PrinterComponent {
  @Input() playlist!: Playlist;
}
