import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Song } from '../app/shared/models/playlist';

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  youtubeApiKey = 'AIzaSyBQX9jqvWNaHMrOS6hAHDokIJNgnjHaXEE';
  url = 'https://www.googleapis.com/youtube/v3/videos';
  constructor(private httpClient: HttpClient) {}

  public getSong(enteredYoutubeId: string): Observable<Song> {
    const ytId = this.stripIdFromÚrl(enteredYoutubeId);
    const urlParams = new HttpParams().set('key', this.youtubeApiKey).set('part', 'snippet').set('id', ytId);

    const options = { params: urlParams };
    return this.httpClient.get<any>(this.url, options).pipe(
      map((data) => {
        const item = data.items[0];
        return new Song(item.id, item.snippet.title, item.snippet.channelTitle);
      })
    );
  }

  private stripIdFromÚrl(url: string): string {
    const index = url.indexOf('?v=');
    if (index < 0) return url;
    return url.substring(index + 3);
  }
}
