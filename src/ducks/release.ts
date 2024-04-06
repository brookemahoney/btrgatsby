export interface TSReleaseResponse {
  body: {
    processed: string
  },
  id: string,
  title: string,
  relationships: {
    field_image: {
      field_media_image: {
        alt: string,
      },
      relationships: {
        field_media_image: {
          localFile: any,
        }
      }
    }
  }
}

export interface TSRelease {
  id: string,
  title: string,
  body: string,
  image: {
    alt: string,
    localFile: any,
  }
}

export const getReleaseFromResponse = (response: TSReleaseResponse): TSRelease => ({
  id: response.id,
  title: response.title,
  body: response.body.processed,
  image: {
    alt: response.relationships.field_image.field_media_image.alt,
    localFile: response.relationships.field_image.relationships.field_media_image.localFile,
  },
});
