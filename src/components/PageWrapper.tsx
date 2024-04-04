import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

const PageWrapperStyled = styled.div`
  a {
    color: #ff5400;

    &:hover {
      color: #ffff00;
    }
  }
`;

const LogoWrapperStyled = styled.div`
  text-align: center;
`;

const PageWrapper = ({ children } : { children: React.ReactNode }) => (
  <PageWrapperStyled>
    <LogoWrapperStyled>
      <StaticImage src="../images/logo.png" alt="Burning Token Records" />
    </LogoWrapperStyled>
    { children }
  </PageWrapperStyled>
);

export default PageWrapper
