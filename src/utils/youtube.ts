export interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_ID = "UCvqXm4_ibDLtVOya3IOGYHA"; // Replace with your channel ID

  if (!YOUTUBE_API_KEY) {
    console.error("Missing YouTube API Key!");
    return [];
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=50`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch YouTube videos: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}
