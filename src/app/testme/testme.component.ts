import {Component} from '@angular/core';
import { YouTubePlayer} from '@angular/youtube-player';

@Component({
  standalone: true,
  imports: [YouTubePlayer],
  template: '<youtube-player videoId="mVjYG9TSN88"/>',
  selector: 'youtube-player-example',
})
export class YoutubePlayerExample {}