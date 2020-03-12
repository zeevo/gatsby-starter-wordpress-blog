import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';

import Layout from '../components/Layout';
import Blog from '../components/Blog';

const IndexRoute = props => {
  const { data } = props;
  const { name, description } = data.wordpressSiteMetadata;

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{parse(name)}</title>
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
