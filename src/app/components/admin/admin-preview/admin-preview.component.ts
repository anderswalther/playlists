import { Component, Inject, Input } from '@angular/core';
import { Playlist } from '../../../models/playlist';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PlaylistComponent } from '../../playlist.component';

@Component({
  selector: 'app-admin-preview',
  standalone: true,
  imports: [DragDropModule, PlaylistComponent],
  template: `
    <div class="dialog-content" mat-dialog-content>
      <app-playlist [previewPlaylist]="playlist"></app-playlist>
    </div>
  `,
  styleUrl: './admin-preview.component.css',
})
export class AdminPreviewComponent {
  playlist!: Playlist;

  constructor(
    private dialogRef: MatDialogRef<AdminPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.playlist) {
      this.playlist = data.playlist;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
