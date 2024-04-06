import path from 'path';
import type { GatsbyNode } from 'gatsby';
import { TSBandResponse } from './src/ducks/band';

export const createPages: GatsbyNode["createPages"] = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const result:any = await graphql(`
    query {
      allNodeBand {
        nodes {
          id
          path {
            alias
          }
          title
        }
      }
    }
  `);

  result.data.allNodeBand.nodes.forEach((node: TSBandResponse) => {
    createPage({
      path: node.path.alias,
      component: path.resolve('src/templates/band.tsx'),
      context: {
        nodeId: node.id,
      },
    });
  });
};
