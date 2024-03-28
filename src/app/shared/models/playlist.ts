export class Playlist {
  public id?: string;
  constructor(
    public message: string,
    public background: string,
    public textColor: string,
    public songs: Song[]
  ) {}

  public static emptyPlaylist(): Playlist {
    return new Playlist('', '', 'black', []);
  }

  public generateId() {
    const length = 8;
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    this.id = result;
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
