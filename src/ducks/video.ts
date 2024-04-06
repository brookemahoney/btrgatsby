export interface TSVideoResponse {
  id: string,
  title: string,
  relationships: {
    field_video: {
      field_media_oembed_video: string,
    }
  }
}

export interface TSVideo {
  id: string,
  title: string,
  video: string,
}

export const getVideoFromResponse = (response: TSVideoResponse): TSVideo => ({
  id: response.id,
  title: response.title,
  video: response.relationships.field_video.field_media_oembed_video,
});
