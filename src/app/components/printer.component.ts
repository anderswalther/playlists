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
      </div>
    </div>

    <button styleSheetFile="assets/print-styling.css" printTitle="MyTitle" printSectionId="print-section" ngxPrint>
      print
    </button>
  `,
  styles: `
    .container {
    }

  `,
})
export class PrinterComponent {
  @Input() playlist!: Playlist;
}
