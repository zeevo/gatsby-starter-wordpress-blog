const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const slash = require('slash');
const moment = require('moment');
const config = require('./gatsby-config');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/post-template.jsx');
    const pageTemplate = path.resolve('./src/templates/page-template.jsx');
    const tagTemplate = path.resolve('./src/templates/tag-template.jsx');
    const categoryTemplate = path.resolve('./src/templates/category-template.jsx');

    graphql(`
      {
        allWordpressPost(
          sort: { fields: [date] }
          filter: { title: { regex: "/^((?!dummy).)*$/igm" } }
        ) {
          edges {
            node {
              id
              date
              title
              slug
              type
              categories {
                name
              }
            }
          }
        }
        allWordpressPage(sort: { fields: [date] }) {
          edges {
            node {
              id
              date
              slug
              title
              type
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
      }

      const allContent = result.data.allWordpressPost.edges.concat(
        result.data.allWordpressPage.edges
      );

      const sortedAllContent = allContent.sort((a, b) => new Date(a.date) - new Date(b.date));

      _.each(sortedAllContent, edge => {
        const { date } = edge.node;
        const { slug } = edge.node;
        const preSlug = moment(new Date(date)).format('YYYY/MM/DD');
        const formattedURI = `${preSlug}/${slug}`;
        if (_.get(edge, 'node.type') === 'page') {
          createPage({
            path: slug,
            component: slash(pageTemplate),
            context: { id: edge.node.id, background: edge.node.background, uri: slug },
          });
        } else if (_.get(edge, 'node.type') === 'post') {
          createPage({
            path: formattedURI,
            component: slash(postTemplate),
            context: { id: edge.node.id, uri: formattedURI },
          });

          if (_.get(edge, 'node.categories') && _.get(edge, 'node.categories').length) {
            _.uniq(_.get(edge, 'node.categories'))
              .map(category => category.name)
              .filter(category => category.toLowerCase() !== 'uncategorized')
              .forEach(category => {
                const categoryPath = `/categories/${_.kebabCase(category)}/`;
                createPage({
                  path: categoryPath,
                  component: categoryTemplate,
                  context: { category },
                });
              });
          }
        }
      });

      resolve();
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath);
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`;
    createNodeField({ node, name: 'slug', value: slug });
  } else if (node.internal.type === 'MarkdownRemark' && typeof node.slug === 'undefined') {
    const fileNode = getNode(node.parent);
    let slug = fileNode.fields.slug;
    if (typeof node.frontmatter.path !== 'undefined') {
      slug = node.frontmatter.path;
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    if (typeof node.frontmatter.category !== 'undefined') {
      const categorySlug = `/categories/${_.kebabCase(node.frontmatter.category)}/`;
      createNodeField({ node, name: 'categorySlug', value: categorySlug });
    }
  }
};
