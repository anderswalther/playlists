import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Playlist } from '../models/playlist';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form>
      <input ngModel="model.title" name="title" />
      <button onclick="onSubmit()">Gem</button>
    </form>
  `,
  styles: ``
})
export class AdminComponent implements OnInit {
  model: Playlist = Playlist.emptyPlaylist();

  ngOnInit(): void {

  }

  onSubmit(): void {
    
  }

}
