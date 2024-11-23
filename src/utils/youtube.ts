export interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  if (!YOUTUBE_API_KEY) {
    throw new Error(
      "YouTube API Key is missing. Please check your environment variables."
    );
  }

  if (!CHANNEL_ID) {
    throw new Error(
      "YouTube Channel ID is missing. Please check your environment variables."
    );
  }

  try {
    console.log("Fetching videos for channel:", CHANNEL_ID);

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&type=video&order=date&maxResults=50`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("YouTube API Error:", errorData);
      throw new Error(
        `Failed to fetch YouTube videos: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      console.error("Unexpected API response format:", data);
      throw new Error("Invalid API response format");
    }

    console.log(`Found ${data.items.length} videos`);

    return data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    throw error;
  }
}
