import React from 'react';
import { graphql } from 'gatsby';


const Band = ({ data: { nodeBand } }) => (
  <main>
    <h1>{ nodeBand.title }</h1>
  </main>
);

export const query = graphql`
  query($nodeId: String!) {
    nodeBand(id: { eq: $nodeId }) {
      title
    }
  }
`;

export default Band;
