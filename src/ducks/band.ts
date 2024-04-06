import { getReleaseFromResponse, TSRelease, TSReleaseResponse } from './release';

export type TSBandResponse = {
  id: string,
  path: { alias: string },
  body: {
    processed: string,
  },
  relationships: {
    field_image: {
      relationships: {
        field_media_image: {
          uri: {
            url: string,
          },
          localFile: any,
        },
      },
      field_media_image: {
        alt: string,
      },
    },
    field_releases: TSReleaseResponse[],
  },
  title: string,
};

export type TSBand = {
  id: string,
  path: string,
  title: string,
  body: string,
  image: {
    alt: string,
    localFile: any,
  }
  releases: TSRelease[],
};

export const getBandFromResponse = (response: TSBandResponse): TSBand => ({
  id: response.id,
  path: response.path.alias,
  title: response.title,
  body: response.body.processed,
  image: {
    alt: response.relationships.field_image.field_media_image.alt,
    localFile: response.relationships.field_image.relationships.field_media_image.localFile,
  },
  releases: response.relationships.field_releases.map(getReleaseFromResponse),
});
