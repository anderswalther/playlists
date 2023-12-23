export class Playlist {
  constructor(public title: string) {}

  public static emptyPlaylist(): Playlist {
    return new Playlist("")
  }
}
