import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { TSBandResponse, getBandFromResponse } from '../ducks/band';
import PageWrapper from '../components/PageWrapper';

type TSProps = { data: { nodeBand: TSBandResponse } };

const PageInnerStyled = styled.div`
  text-align: center;
`;

const BodyStyled = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

const Band = ({ data: { nodeBand: bandResponse } }: TSProps) => {
  const band = getBandFromResponse(bandResponse);
  const image = getImage(band.image.localFile);
  return (
    <PageWrapper>
      <PageInnerStyled>
        <h1>{band.title}</h1>
        {image && (
          <GatsbyImage image={image} alt={band.image.alt} />
        )}
        <BodyStyled dangerouslySetInnerHTML={{ __html: band.body }} />
        <h2>Releases</h2>
      </PageInnerStyled>
    </PageWrapper>
  );
};

export const query = graphql`
  query($nodeId: String!) {
    nodeBand(id: { eq: $nodeId }) {
      title
      body {
        processed
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
                  gatsbyImageData(
                    placeholder: BLURRED
                  )
                }
              }
            }
            field_releases {
              body {
                processed
              }
              title
              relationships {
                field_image {
                  field_media_image {
                    alt
                  }
                  relationships {
                    field_media_image {
                      localFile {
                        childrenImageSharp {
                          gatsbyImageData(placeholder: BLURRED)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          field_media_image {
            alt
          }
        }
      }
    }
  }
`;

export default Band;
