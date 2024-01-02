import 'youtube';
import { EventEmitter } from '@angular/core';

export enum StateChanges {
  UNSTARTET = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5
}

