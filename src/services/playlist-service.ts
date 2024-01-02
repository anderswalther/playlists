import { Injectable } from '@angular/core';
import {
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { Playlist } from '../app/models/playlist';
import { Observable, map } from 'rxjs';
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
    setDoc(doc(this.firestore, 'Playlist', playlist.id), {
      message: playlist.message,
      background: playlist.background,
      song1: playlist.song1,
      song2: playlist.song2,
      song3: playlist.song3,
      song4: playlist.song4,
      song5: playlist.song5,
    });

    /*
    addDoc(this.playlistCollection, JSON.parse(JSON.stringify(playlist))).then(
      () => {}
    );
    */
  }

  async getPlaylists(): Promise<Playlist[]> {
    return (
      await getDocs(query(collection(this.firestore, 'Playlist')))
    ).docs.map((playlist) => playlist.data() as Playlist);
  }

  async getPlaylist(id: string): Promise<Playlist | undefined> {
    const docRef = doc(this.firestore, 'Playlist', id);
    const plSnapshot = await getDoc(docRef);
    console.log(plSnapshot.data() || 'Doc does not exists');

    return plSnapshot.data() as Playlist;
  }
}
