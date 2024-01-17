export class Playlist {
  constructor(
    public id: string,
    public message: string,
    public background: string,
    public songs: Song[]
  ) {}

  public static emptyPlaylist(id: string = ''): Playlist {
    return new Playlist(id, '', '', []);
  }
}

export class Song {
  constructor(
    public ytId: string,
    public title: string,
    public artist: string
  ) {}

  public static emptySong() {
    return new Song('', '', '');
  }
}
