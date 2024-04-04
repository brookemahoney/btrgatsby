export type TSBand = {
  id: string,
  path: { alias: string },
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
  },
  title: string,
};
