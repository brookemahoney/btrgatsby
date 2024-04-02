import * as React from "react"
import {
  graphql,
  Link,
  PageProps
} from "gatsby"
import Band from "../templates/band";

type Band = {
  id: string,
  path: { alias: string },
  relationships: {
    field_image: {
      relationships: {
        field_media_image: {
          uri: {
            url: string,
          },
        },
      },
      field_media_image: {
        alt: string,
      },
    },
  },
  title: string,
};

type DataProps = {
  site: {
    siteMetadata: {
      siteUrl: string,
      title: string,
    },
  },
  allNodeBand: {
    nodes: [Band],
  },
};

const IndexRoute = ({ data: { site, allNodeBand: { nodes: bands } } }: PageProps<DataProps>) => {
  const siteUrl = site.siteMetadata.siteUrl;
  return (
    <main>
      <h1>{site.siteMetadata.title}</h1>
      <h2>Bands</h2>
      <ul>
        {bands.map(band => (
          <li key={band.id}>
            <Link to={ band.path.alias }>
              <img
                alt={ band.relationships.field_image.field_media_image.alt }
                src={ `${siteUrl}/${ band.relationships.field_image.relationships.field_media_image.uri.url }` }
              />
              <br />
              { band.title }
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default IndexRoute

export const query = graphql`
  {
    site {
      siteMetadata {
        siteUrl
        title
      }
    },
    allNodeBand(sort: {title: ASC}) {
      nodes {
        id
        path {
          alias
        }
        relationships {
          field_image {
            relationships {
              field_media_image {
                uri {
                  url
                }
              }
            }
            field_media_image {
              alt
            }
          }
        }
        title
      }
    },
  }
`
