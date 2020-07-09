import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import parse from 'html-react-parser';

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
          <title>{`${category} - ${parse(title)}`}</title>
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
          title
          uri
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
    }
    allWpPost(filter: { categories: { nodes: { elemMatch: { name: { eq: $category } } } } }) {
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
            nodes {
              name
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
    allWpPage {
      edges {
        node {
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
  }
`;
