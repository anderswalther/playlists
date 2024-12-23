export interface YoutubeSearchResultItem {
  id: {
    videoId: string;    // The YouTube video ID
  };
  snippet: {
    title: string;      // Video title
    description: string;  // Video description
    publishedAt: string;  // Publication date
    thumbnails: {
      default: {      // There are also 'medium' and 'high' sizes available
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;  // Name of the channel
    channelId: string;     // ID of the channel
  };
}