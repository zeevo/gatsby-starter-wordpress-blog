import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';

import Layout from '../components/Layout';
import Blog from '../components/Blog';

const IndexRoute = props => {
  const { wp } = props.data;
  const { title, description } = wp.generalSettings;

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{parse(title)}</title>
          <meta name="description" content={parse(description)} />
        </Helmet>
        <div />
        <Blog {...props} />
      </div>
    </Layout>
  );
};

export default IndexRoute;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        subtitle
        adminUrl
        rss
        menu {
          title
          slug
          external
        }
        author {
          name
          twitter
          avatar
        }
      }
    }

    wp {
      generalSettings {
        title
        description
      }

      posts {
        edges {
          node {
            title
            date
            excerpt
            slug
            author {
              node {
                name
              }
            }
            categories {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
                title
              }
            }
          }
        }
      }
      pages {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;
