export class Playlist {
  public id: string;
  constructor(
    public message: string,
    public background: string,
    public textColor: string,
    public songs: Song[]
  ) {
    this.id = this.getRandomString(8);
  }

  public static emptyPlaylist(): Playlist {
    return new Playlist('', '', 'black', []);
  }

  private getRandomString(length: number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
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
