import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [],
  imports: [CommonModule, YouTubePlayerModule],
  exports: [YouTubePlayerModule],
})
export class SharedModule {}
