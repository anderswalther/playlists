import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [],
  template: `
    <img class="preloading-image" [src]="backgroundImageUrl" (load)="imageDoneLoading()" />
    @for (imgUrl of staticImages; track imgUrl) {
      <img [src]="imgUrl" (load)="imageDoneLoading()" />
    }
  `,
  styleUrl: './preloader.component.css',
})
export class PreloaderComponent {
  @Input() backgroundImageUrl = '';
  @Output() allImagesLoaded = new EventEmitter<void>();
  staticImages: string[] = [
    'assets/icons/printer.png',
    'assets/icons/pause.png',
    'assets/icons/play.png',
    'assets/icons/forward.png',
    'assets/icons/backward.png',
  ];
  imagesLoading = 1 + this.staticImages.length;

  imageDoneLoading() {
    this.imagesLoading--;
    if (this.imagesLoading <= 0) {
      this.allImagesLoaded.emit();
    }
  }
}
