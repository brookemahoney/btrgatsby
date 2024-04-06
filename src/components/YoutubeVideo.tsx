import React from 'react';
import getYouTubeID from 'get-youtube-id';
import 'lite-youtube-embed/src/lite-yt-embed.css';
import 'lite-youtube-embed/src/lite-yt-embed.js';


interface TSProps {
  label: string,
  url: string,
}

const YouTubeVideo = ({ url, label }: TSProps) => (
  <div dangerouslySetInnerHTML={{__html: `<lite-youtube videoid="${getYouTubeID(url)}" playlabel="${label}"></lite-youtube>`}} />
);

export default YouTubeVideo;
