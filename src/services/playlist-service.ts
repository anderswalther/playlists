import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Playlist } from '../app/models/playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(privgit ate firebase: AngularFirestore) {}

  addPlaylist(playlist: Playlist): void {}
}
