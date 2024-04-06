import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

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

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <PageWrapperStyled>
    <LogoWrapperStyled>
      <Link to='/'>
        <StaticImage src="../images/logo.png" alt="Burning Token Records" />
      </Link>
    </LogoWrapperStyled>
    <main>
      {children}
    </main>
  </PageWrapperStyled>
);

export default PageWrapper
