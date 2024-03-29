import * as React from "react"
import {
  graphql,
  Link,
  PageProps
} from "gatsby"

type DataProps = {
  site: {
    siteMetadata: {
      title: string,
    },
  },
  allNodeBand: {
    nodes: [{
      id: string,
      path: { alias: string },
      title: string,
    }],
  },
};

const IndexRoute = ({ data: { site, allNodeBand: { nodes: bands } } }: PageProps<DataProps>) => {
  return (
    <main>
      <h1>{site.siteMetadata.title}</h1>
      <h2>Bands</h2>
      <ul>
        {bands.map(band => (
          <li key={band.id}>
            <Link to={ band.path.alias }>
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
        title
      }
    },
    allNodeBand(sort: {title: ASC}) {
      nodes {
        id
        path {
          alias
        }
        title
      }
    }
  }
`
