import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
        <div class="link">www.share-playlists.com/playlist?id={{ playlist.id }}</div>
      </div>
    </div>

    <button
      #printButton
      styleSheetFile="assets/print-styling.css"
      printTitle="_"
      printSectionId="print-section"
      ngxPrint
    >
      Print
    </button>
  `,
  styles: `
    .container {
      display: none;
    }

    button {
      visibility: hidden
    }
  `,
})
export class PrinterComponent {
  @Input() playlist!: Playlist;
  @ViewChild('printButton') printButton?: ElementRef;
  public print(): void {
    if (this.printButton) {
      this.printButton.nativeElement.click();
    }
  }
}
