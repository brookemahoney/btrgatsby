import { TSFieldImage } from './fields';
import { getReleaseFromResponse, TSRelease, TSReleaseResponse } from './release';

interface TSBandBaseResponse {
  id: string,
  path: { alias: string },
  title: string,
}

export interface TSBandTeaserResponse extends TSBandBaseResponse {
  relationships: {
    field_image: TSFieldImage,
  },
}

export interface TSBandResponse extends TSBandBaseResponse {
  body: {
    processed: string,
  },
  relationships: {
    field_image: TSFieldImage,
    field_releases: TSReleaseResponse[],
  },
};

export interface TSBandTeaser {
  id: string,
  path: string,
  title: string,
  image: {
    alt: string,
    localFile: any,
  }
};

export interface TSBand extends TSBandTeaser {
  body: string,
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

export const getBandTeaserFromResponse = (response: TSBandTeaserResponse): TSBandTeaser => ({
  id: response.id,
  path: response.path.alias,
  title: response.title,
  image: {
    alt: response.relationships.field_image.field_media_image.alt,
    localFile: response.relationships.field_image.relationships.field_media_image.localFile,
  },
});
