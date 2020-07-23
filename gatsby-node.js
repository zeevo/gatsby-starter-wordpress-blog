const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const slash = require('slash');
const moment = require('moment');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/post-template.jsx');
    const pageTemplate = path.resolve('./src/templates/page-template.jsx');
    const categoryTemplate = path.resolve('./src/templates/category-template.jsx');
    const tagTemplate = path.resolve('./src/templates/tag-template.jsx');

    graphql(`
      query {
        allWpPost {
          edges {
            node {
              id
              title
              slug
              date
              categories {
                nodes {
                  name
                }
              }
            }
          }
        }
        allWpPage {
          edges {
            node {
              id
              date
              uri
              title
            }
          }
        }
        allWpCategory {
          nodes {
            name
          }
        }
        allWpTag {
          nodes {
            name
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
      } else {
        const { allWpPost, allWpPage, allWpCategory, allWpTag } = result.data;

        const sortedPosts = allWpPost.edges
          .map(edge => edge.node)
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        const sortedPages = allWpPage.edges
          .map(edge => edge.node)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        sortedPosts.forEach(post => {
          const { date, slug } = post;
          const preSlug = moment(new Date(date)).format('YYYY/MM/DD');
          const formattedURI = `${preSlug}/${slug}`;
          createPage({
            path: formattedURI,
            component: slash(postTemplate),
            context: { id: post.id, uri: formattedURI },
          });
        });

        sortedPages.forEach(post => {
          const { uri } = post;
          createPage({
            path: uri,
            component: slash(pageTemplate),
            context: { id: post.id },
          });
        });

        allWpCategory.nodes.forEach(node => {
          const name = node.name;
          const categoryPath = `/categories/${_.kebabCase(name)}/`;
          createPage({
            path: categoryPath,
            component: categoryTemplate,
            context: { category: name },
          });
        });

        allWpTag.nodes.forEach(node => {
          const name = node.name;
          const tagPath = `/tag/${_.kebabCase(name)}/`;
          createPage({
            path: tagPath,
            component: tagTemplate,
            context: { tag: name },
          });
        });

        resolve();
      }
    });
  });
};
