export class Playlist {
  constructor(
    public id: string,
    public message: string,
    public song1: string,
    public song2: string,
    public song3: string,
    public song4: string,
    public song5: string,
    public background: string
  ) {}

  public static emptyPlaylist(id: string = ''): Playlist {
    return new Playlist(id, '', '', '', '', '', '', '');
  }
}
