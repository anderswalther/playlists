import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {YoutubeSearchResult} from "../../../models/youtube-search-result";
import {YoutubeSearchResultItem} from "../../../models/youtube-search-result-item";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-youtube-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <div class="search-container">
      @if (searchResults.length > 0) {
        <div class="results-container">
          @for (result of searchResults; track result.id.videoId) {
            <div class="result-item" (click)="selectVideo(result)">
              <img [src]="result.snippet.thumbnails.default.url" alt="thumbnail" />
              <span>{{ result.snippet.title }}</span>
            </div>
          }
        </div>
      }

      <input
        [(ngModel)]="searchInput"
        type="text"
        [placeholder]="placeholder"
        (input)="onSearchChange($event)"
        class="search-input"
      />
    </div>
  `,
  styleUrl: './youtube-search.component.css'
})
export class YoutubeSearchComponent {
  @Output() videoSelected = new EventEmitter<{id: string, title: string}>();

  searchInput = '';
  placeholder = 'Search for YouTube videos...';
  searchResults: YoutubeSearchResultItem[] = [];
  private searchSubject = new Subject<string>();
  private API_KEY = 'AIzaSyBQX9jqvWNaHMrOS6hAHDokIJNgnjHaXEE'; // Replace with your API key

  constructor(private http: HttpClient) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => this.searchYouTube(searchTerm))
    ).subscribe(results => {
      this.searchResults = results.items;
    });
  }

  onSearchChange(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm.length > 2) {
      this.searchSubject.next(searchTerm);
    } else {
      this.searchResults = [];
    }
  }

  private searchYouTube(searchTerm: string) {
    const url = 'https://www.googleapis.com/youtube/v3/search';
    const params = {
      key: this.API_KEY,
      q: searchTerm,
      part: 'snippet',
      type: 'video',
      maxResults: '5'
    };

    return this.http.get<YoutubeSearchResult>(url, { params });
  }

  selectVideo(result: YoutubeSearchResultItem) {
    this.videoSelected.emit({
      id: result.id.videoId,
      title: result.snippet.title
    });
    this.searchResults = [];
    this.searchInput = '';

  }
}
