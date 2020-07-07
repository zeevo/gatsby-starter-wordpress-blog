import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import CategoryTemplateDetails from '../components/CategoryTemplateDetails';

const CategoryTemplate = props => {
  const { data, pageContext } = props;
  const { title } = data.wp.generalSettings;
  const { category } = pageContext;

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${category} - ${title}`}</title>
          <meta name="description" content={`${title} - ${category}`} />
        </Helmet>
        <CategoryTemplateDetails {...props} />
      </div>
    </Layout>
  );
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query($category: String!) {
    site {
      siteMetadata {
        adminUrl
        rss
        menu {
          label
          path
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
      posts(where: { categoryName: $category }) {
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
