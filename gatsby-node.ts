import path from 'path';

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const result = await graphql(`
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

  result.data.allNodeBand.nodes.forEach(node => {
    createPage({
      path: node.path.alias,
      component: path.resolve('src/templates/band.tsx'),
      context: {
        nodeId: node.id,
      },
    });
  });
};
