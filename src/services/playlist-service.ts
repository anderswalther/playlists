import { Injectable, signal, computed } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, getDocs, query, setDoc } from '@angular/fire/firestore';
import { Playlist } from '../app/shared/models/playlist';
import { Observable, take } from 'rxjs';
import { inject } from '@angular/core';

interface PlaylistState {
  playlists: Playlist[];
}

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore
  playlistCollection = collection(this.firestore, 'Playlist');
  state = signal<PlaylistState>({ playlists: [] });

  // selectors
  playlists$ = computed(() => this.state().playlists);

  constructor() {}

  public loadAllPlaylists(): void {
    // get documents (data) from the collection using collectionData
    (collectionData(this.playlistCollection, { idField: 'id' }) as Observable<Playlist[]>)
      .pipe(take(1))
      .subscribe((playlists) => {
        console.log('we got data: ', playlists);
        this.state.update((state) => ({
          ...state,
          playlists,
        }));
      });
  }
  public addPlaylist(playlist: Playlist): Promise<void> {
    const songs = playlist.songs.map((obj) => {
      return Object.assign({}, obj);
    });

    if (!playlist.id) {
      playlist.generateId();
    }

    return setDoc(doc(this.firestore, 'Playlist', playlist.id!), {
      message: playlist.message,
      background: playlist.background,
      textColor: playlist.textColor,
      songs,
    });
  }

  async getPlaylists(): Promise<Playlist[]> {
    return (await getDocs(query(collection(this.firestore, 'Playlist')))).docs.map(
      (playlist) => playlist.data() as Playlist
    );
  }

  async getPlaylist(id: string): Promise<Playlist> {
    if (!id) return Playlist.emptyPlaylist();

    const docRef = doc(this.firestore, 'Playlist', id);
    const plSnapshot = await getDoc(docRef);
    const dataObj = plSnapshot.data();

    if (!dataObj) {
      return Playlist.emptyPlaylist();
    }

    const playlist = dataObj as Playlist;
    playlist.id = id;
    return playlist;
  }
}
