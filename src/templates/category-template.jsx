import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import CategoryTemplateDetails from '../components/CategoryTemplateDetails';

const CategoryTemplate = props => {
  const { data, pageContext } = props;
  const { name } = data.wordpressSiteMetadata;
  const { category } = pageContext;

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${category} - ${name}`}</title>
          <meta name="description" content={`${name} - ${category}`} />
        </Helmet>
        <CategoryTemplateDetails {...props} />
      </div>
    </Layout>
  );
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        copyright
        profilePic
        menu {
          label
          path
          external
        }
        author {
          name
          twitter
        }
      }
    }
    wordpressSiteMetadata {
      name
      home
      description
    }
    allWordpressPost(
      limit: 1000
      sort: { order: DESC, fields: date }
      filter: { title: { regex: "/^((?!dummy).)*$/igm" } }
    ) {
      edges {
        node {
          title
          date
          excerpt
          type
          slug
          author {
            name
          }
          categories {
            name
          }
          featured_media {
            source_url
            title
          }
        }
      }
    }
    allWordpressPage {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
  }
`;
