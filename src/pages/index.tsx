import React from 'react';
import {
  graphql,
  Link,
  PageProps
} from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { styled } from 'styled-components';
import PageWrapper from '../components/PageWrapper';
import { getBandTeaserFromResponse, TSBandTeaserResponse } from '../ducks/band';


type DataProps = {
  site: {
    siteMetadata: {
      siteUrl: string,
    },
  },
  allNodeBand: {
    nodes: [TSBandTeaserResponse],
  },
};

const BandsGridStyled = styled.div`
  text-align: center;

  li {
    list-style: none;
    padding: 10px;
    max-width: 240px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
`;

const BandTeaserWrapper = styled.div`
  align-items: center;
  border: 10px solid #ff5400;
  border-radius: 10px;
  display: flex;
  min-height: 240px;

  &:hover {
    border-color: #FFFF00;
  }

  img {
    border-radius: 2px;
  }
`;

const BandTitleStyled = styled.div`
  padding: 5px;
`;

const IndexRoute = ({ data: { site, allNodeBand: { nodes: bandsResponse } } }: PageProps<DataProps>) => {
  const siteUrl = site.siteMetadata.siteUrl;
  const bands = bandsResponse.map(getBandTeaserFromResponse);
  return (
    <PageWrapper>
      <BandsGridStyled>
        <ul>
          {bands.map(band => {
            const image = getImage(band.image.localFile);
            return (
              <li key={band.id}>
                <Link to={ band.path }>
                  <BandTeaserWrapper>
                    <div>
                      { image && <GatsbyImage image={image} alt={band.image.alt} /> }
                      <BandTitleStyled>
                        { band.title }
                      </BandTitleStyled>
                    </div>
                  </BandTeaserWrapper>
                </Link>
              </li>
            );
          })}
        </ul>
      </BandsGridStyled>
    </PageWrapper>
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
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 240)
                  }
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
