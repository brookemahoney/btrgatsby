import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { TSBandResponse, getBandFromResponse } from '../ducks/band';
import PageWrapper from '../components/PageWrapper';
import YouTubeVideo from '../components/YoutubeVideo';

type TSProps = { data: { nodeBand: TSBandResponse } };

const widthContainer = '1200px'

const PageInnerStyled = styled.div`
  text-align: center;
`;

const BodyStyled = styled.div`
  margin: 0 auto;
  max-width: 100%;
  width: ${widthContainer};
`;

const ReleasesStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  width: ${widthContainer};
`;

const ReleaseStyled = styled.div`
  border: 1px solid #333;
  width: 400px;
`;

const ReleaseBodyStyled = styled.div``;

const VideosStyled = ReleasesStyled;

const VideoStyled = ReleaseStyled;

const Band = ({ data: { nodeBand: bandResponse } }: TSProps) => {
  const band = getBandFromResponse(bandResponse);
  const bandImage = getImage(band.image.localFile);
  return (
    <PageWrapper>
      <PageInnerStyled>
        <h1>{band.title}</h1>
        {bandImage && (
          <GatsbyImage image={bandImage} alt={band.image.alt} />
        )}
        <BodyStyled dangerouslySetInnerHTML={{ __html: band.body }} />
        {band.releases.length > 0 && (
          <>
            <h2>Releases</h2>
            <ReleasesStyled>
              {band.releases.map(release => {
                const releaseImage = getImage(release.image.localFile);
                return (
                  <ReleaseStyled key={release.id}>
                    <h3>{release.title}</h3>
                    {releaseImage && (
                      <GatsbyImage image={releaseImage} alt={release.image.alt} />
                    )}
                    <ReleaseBodyStyled dangerouslySetInnerHTML={{ __html: release.body }} />
                  </ReleaseStyled>
                );
              })}
            </ReleasesStyled>
          </>
        )}
        {band.videos.length > 0 && (
          <>
            <h2>Videos</h2>
            <VideosStyled>
              {band.videos.map(video => {
                return (
                  <VideoStyled>
                    <h3>{video.title}</h3>
                    <YouTubeVideo url={video.video} label={video.title} />
                  </VideoStyled>
                );
              })}
            </VideosStyled>
          </>
        )}
      </PageInnerStyled>
    </PageWrapper>
  );
};

export const query = graphql`
  query($nodeId: String!) {
    nodeBand(id: { eq: $nodeId }) {
      id
      title
      body {
        processed
      }
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
                  gatsbyImageData(
                    placeholder: BLURRED
                  )
                }
              }
            }
          }
          field_media_image {
            alt
          }
        }
        field_releases {
          body {
            processed
          }
          id
          title
          relationships {
            field_image {
              field_media_image {
                alt
              }
              relationships {
                field_media_image {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(
                        placeholder: BLURRED
                        width: 400
                      )
                    }
                  }
                }
              }
            }
          }
        }
        field_videos {
          id
          title
          relationships {
            field_video {
              field_media_oembed_video
            }
          }
        }
      }
    }
  }
`;

export default Band;
