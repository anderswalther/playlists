import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Playlist } from '../app/models/playlist';
import { Observable } from 'rxjs';
import { Component, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore
  playlists$: Observable<Playlist[]>;
  playlistCollection = collection(this.firestore, 'Playlist');

  constructor() {
    // get documents (data) from the collection using collectionData
    this.playlists$ = collectionData(this.playlistCollection) as Observable<
      Playlist[]
    >;
  }

  public addPlaylist(playlist: Playlist) {
    addDoc(this.playlistCollection, JSON.parse(JSON.stringify(playlist))).then(() => {});
  }

  public getAllPlaylists(): Observable<Playlist[]> {
    // get a reference to the user-profile collection

    // get documents (data) from the collection using collectionData
    return collectionData(this.playlistCollection) as Observable<Playlist[]>;
  }
}
